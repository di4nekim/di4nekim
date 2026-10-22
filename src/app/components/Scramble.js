"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const POOL = "abcdefghijklmnopqrstuvwxyz0123456789";
// Each letter settles a beat after the one before it, left to right.
const START = 300;
const SETTLE = 900;
const STAGGER = 150;
// Time per character as the reel turns. It spins up from SPIN_UP to FAST over
// the first RAMP ms, then winds down to SLOW just before it lands.
const SPIN_UP = 400;
const RAMP = 500;
const FAST = 150;
const SLOW = 260;
// Each reel runs a little faster or slower than the others, and starts up to
// OFFSET ms late, so no two letters move in step.
const JITTER = 0.2;
const OFFSET = 150;
// The landing: the reel coasts onto its letter, overshoots a touch, and
// settles back, like a reel stopping. BACK sets how far it overshoots.
const LAND = 500;
const BACK = 1.7;

// Never the character next to it on the reel, or a turn reads as a stutter.
const pick = (...not) => {
  let char;
  do char = POOL[Math.floor(Math.random() * POOL.length)];
  while (not.includes(char));
  return char;
};

const backOut = (u) => 1 + (BACK + 1) * (u - 1) ** 3 + BACK * (u - 1) ** 2;

// Plans one reel: the characters on it, and where it is (in characters
// turned) at any moment. Planned up front so the reel can move continuously
// and still stop exactly on its letter.
function plan(char, lands) {
  const delay = Math.random() * OFFSET;
  // When the spinning hands over to the landing.
  const coast = lands - delay - LAND / 2;
  const beat = (t) => {
    if (t < RAMP) return FAST + (SPIN_UP - FAST) * (1 - t / RAMP) ** 2;
    const p = Math.min((t - RAMP) / (coast - RAMP), 1);
    return FAST + (SLOW - FAST) * p * p;
  };

  // Distance turned while spinning, sampled every STEP ms.
  const STEP = 4;
  const turned = [0];
  for (let t = STEP; t <= coast + STEP; t += STEP) {
    turned.push(turned[turned.length - 1] + STEP / beat(t - STEP / 2));
  }
  const at = (t) => {
    const k = Math.min(Math.floor(t / STEP), turned.length - 2);
    const f = t / STEP - k;
    return turned[k] + (turned[k + 1] - turned[k]) * f;
  };

  // The landing starts at the spinning speed (backOut's slope at 0 is
  // BACK + 3), so the hand-over has no jolt.
  const glide = LAND / ((BACK + 3) * SLOW);
  const total = at(coast) + glide;
  // Stretch this reel's pace a little so it turns a whole number of
  // characters and stops square on its letter.
  const stops = Math.max(
    2,
    Math.round(total / (1 + (Math.random() * 2 - 1) * JITTER)),
  );
  const pace = total / stops;

  const reel = [pick()];
  for (let k = 1; k < stops; k++) reel.push(pick(reel[k - 1]));
  if (reel[stops - 1] === char) {
    reel[stops - 1] = pick(reel[stops - 2], char);
  }
  // One past the letter, which peeks in during the overshoot.
  reel.push(char, pick(char));

  const position = (t) => {
    const local = t - delay;
    if (local <= 0) return 0;
    if (local < coast) return at(local) / pace;
    const u = Math.min((local - coast) / LAND, 1);
    return (at(coast) + glide * backOut(u)) / pace;
  };
  const done = (t) => t - delay >= coast + LAND;

  return { reel, position, done };
}

export default function Scramble({ text, className = "" }) {
  const reduceMotion = useReducedMotion();
  const slots = useRef([]);

  // Drawn straight to the DOM every frame rather than through React state:
  // sixty renders a second for five letters is wasted work, and a missed
  // frame is exactly the clunk this is meant to avoid.
  useEffect(() => {
    const target = text.split("");
    const draw = (i, above, current, offset) => {
      const slot = slots.current[i];
      if (!slot) return;
      const [top, middle] = slot.children;
      if (top.textContent !== above) top.textContent = above;
      if (middle.textContent !== current) middle.textContent = current;
      slot.style.transform = `translateY(${offset * 100}%)`;
    };

    if (reduceMotion) {
      target.forEach((char, i) => draw(i, "", char, 0));
      return;
    }

    const reels = target.map((char, i) =>
      plan(char, START + SETTLE + i * STAGGER),
    );
    let frame;
    let begin;
    const tick = (now) => {
      begin ??= now;
      const t = now - begin;
      reels.forEach(({ reel, position }, i) => {
        const pos = position(t);
        const k = Math.floor(pos);
        draw(i, reel[k + 1], reel[k], pos - k);
      });
      if (!reels.every((r) => r.done(t))) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [text, reduceMotion]);

  // The slots start empty: a random first frame from the server would not
  // match the client's, and showing the answer first would spoil the reveal.
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split("").map((char, i) => (
        // Sized by the final letter, so the headline does not jitter as wider
        // and narrower characters roll past. The tight line height makes the
        // window just tall enough for a character, so one rolls out exactly as
        // the next rolls in.
        <span
          key={i}
          aria-hidden="true"
          className="relative inline-block leading-[1.2]"
        >
          <span className="invisible">{char}</span>
          {/* The window clips top and bottom, with a little room either side
              for wide characters. It is absolutely placed so its overflow
              does not move the slot's baseline. */}
          <span className="absolute inset-x-[-0.2em] inset-y-0 overflow-hidden">
            {/* The reel: the next character waits above the window and rolls
                down into it as the current one rolls out the bottom. */}
            <span
              ref={(el) => {
                slots.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <span className="absolute inset-x-0 bottom-full flex justify-center" />
              <span className="absolute inset-0 flex justify-center" />
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}
