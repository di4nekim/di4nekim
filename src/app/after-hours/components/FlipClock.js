"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { u } from "./frame.js";

// Figma: "FLIP CLOCK – YYQX" (1615:241) as it heads the rail in "project
// blurbs v9" — the component's 60 × 80 cards rendered at 42.093 × 56.124.
// Flat #9C0D0F leaves over a see-through body, so the hinge reads as a gap
// onto the page and not as a bevel.
const CARD_W = 42.093;
const CARD_H = 56.124;
const GAP = 4.209;
// Each leaf stops a sliver short of half the card; that sliver is the hinge.
const LEAF_H = 27.36;
const HINGE = 28.76;
// The prototype's Smart Animate beat.
const FOLD = 0.35;
// Each half of a wrap's shuffle: out to the right, then back in behind.
const SHUFFLE = 0.35;
// Far enough out that the old clock clears the new one before it tucks under.
const CLEAR = "110%";

// Half a card: a window onto a full-height face, so the character runs
// unbroken across the hinge instead of being set twice.
function Leaf({ char, bottom }) {
  return (
    <div
      className="absolute left-0 w-full overflow-hidden bg-[#9C0D0F]"
      style={{ top: u(bottom ? HINGE : 0), height: u(LEAF_H) }}
    >
      <div
        className="absolute left-0 w-full text-center font-bold text-[var(--main-beige)]"
        style={{
          top: u(bottom ? -HINGE : 0),
          height: u(CARD_H),
          lineHeight: u(CARD_H),
          fontSize: u(37.88),
          letterSpacing: u(-0.7576),
        }}
      >
        {char}
      </div>
    </div>
  );
}

function FlipCard({ char }) {
  // `current` is on screen, `next` is what it is turning to. They differ only
  // while the fold runs.
  const [current, setCurrent] = useState(char);
  const [next, setNext] = useState(char);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (char === current) return;
    if (reduceMotion) {
      setNext(char);
      setCurrent(char);
      return;
    }
    setNext(char);
    const settle = setTimeout(() => setCurrent(char), FOLD * 1000);
    return () => clearTimeout(settle);
  }, [char, current, reduceMotion]);

  const flipping = next !== current;
  // Snapping back to rest after the fold must not animate: both faces already
  // read the same character by then, but a second rotation would squash it.
  const fold = { duration: flipping ? FOLD : 0, ease: "easeInOut" };
  const hinged = {
    transformOrigin: `50% ${u(HINGE)}`,
    backfaceVisibility: "hidden",
  };

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: u(CARD_W),
        height: u(CARD_H),
        borderRadius: u(6),
        perspective: u(180),
      }}
    >
      {/* Behind the leaves: the top half already reads the new character, the
          bottom half still reads the old one. */}
      <Leaf char={next} />
      <Leaf char={current} bottom />

      {/* The leaves that fold. The top one collapses onto the hinge as the
          bottom one unfolds off it. */}
      <motion.div
        className="absolute inset-0"
        style={hinged}
        animate={{ rotateX: flipping ? -90 : 0 }}
        transition={fold}
      >
        <Leaf char={current} />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={hinged}
        animate={{ rotateX: flipping ? 0 : 90 }}
        transition={fold}
      >
        <Leaf char={next} bottom />
      </motion.div>
    </div>
  );
}

function Cards({ value }) {
  return value.split("").map((char, i) => <FlipCard char={char} key={i} />);
}

// `value` is a quarter code, YYQX. `wraps` counts the times the list has come
// round from one end to the other. A wrap is not a step through time, so the
// clock doesn't flip through it: the new quarter is dealt straight in, and the
// old clock slides out to the right and tucks back in behind it, like a card
// sent to the bottom of the deck.
export default function FlipClock({
  value,
  wraps = 0,
  className,
  style,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  // Held during render rather than in an effect, so the old clock is already
  // on top of the new one in the first frame of a wrap.
  const [seen, setSeen] = useState({ value, wraps });
  const [shuffled, setShuffled] = useState(null);

  if (wraps !== seen.wraps) {
    setSeen({ value, wraps });
    setShuffled(
      reduceMotion ? null : { key: wraps, value: seen.value, behind: false },
    );
  } else if (value !== seen.value) {
    setSeen({ value, wraps });
  }

  return (
    <div
      {...rest}
      className={`isolate flex items-center ${className ?? ""}`}
      style={{ gap: u(GAP), ...style }}
    >
      {/* Keyed by the wrap, so a wrap swaps the cards in rather than flipping
          them. */}
      <Cards value={value} key={`cards-${wraps}`} />

      {shuffled && (
        <motion.div
          key={`shuffled-${shuffled.key}`}
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center"
          style={{ gap: u(GAP), zIndex: shuffled.behind ? -1 : 1 }}
          initial={{ x: 0 }}
          animate={shuffled.behind ? { x: 0 } : { x: CLEAR }}
          transition={{ duration: SHUFFLE, ease: "easeInOut" }}
          onAnimationComplete={() =>
            setShuffled((s) => s && (s.behind ? null : { ...s, behind: true }))
          }
        >
          <Cards value={shuffled.value} />
        </motion.div>
      )}
    </div>
  );
}
