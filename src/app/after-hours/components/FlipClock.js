"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { u } from "./frame.js";

// Figma: "FLIP CLOCK – YYQX" (1615:241) as it heads the rail in "project
// blurbs v9" — the component's 60 × 80 cards rendered at 42.093 × 56.124.
// Flat #9C0D0F leaves over a darker body, so the hinge reads as a line and
// not as a bevel.
const CARD_W = 42.093;
const CARD_H = 56.124;
const GAP = 4.209;
// Each leaf stops a sliver short of half the card; that sliver is the hinge.
const LEAF_H = 27.36;
const HINGE = 28.76;
// The prototype's Smart Animate beat.
const FOLD = 0.35;

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
      className="relative shrink-0 overflow-hidden bg-[#5A0809]"
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

// `value` is a quarter code, YYQX.
export default function FlipClock({ value, className, style }) {
  return (
    <div
      className={`flex items-center ${className ?? ""}`}
      style={{ gap: u(GAP), ...style }}
    >
      {value.split("").map((char, i) => (
        <FlipCard char={char} key={i} />
      ))}
    </div>
  );
}
