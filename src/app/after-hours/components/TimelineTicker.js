"use client";

import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import FlipClock from "./FlipClock.js";
import { red, SETTLE, SETTLE_MOTION, u } from "./frame.js";
import { useLeaveTo } from "./leave.js";

// Figma: "TIMELINE TICKER" (1664:356), the rail to the right of the blurbs.
// A five-stop window onto the one chronological list in content/site.md,
// centred on the stop of whichever project is in focus, with the clock at its
// head reading that project's quarter.
//
// Ticker labels are upright while the blurbs are italic. That contrast is
// what separates the index from the content, so no copy explains it.
const LEADING = 1.21;

// The ticker's empty left margin, up to the tick slot. It sits outside the
// wheel zone, so the offsets inside the zone are the Figma numbers less this.
const GUTTER = 96;

function Stop({ stop, focused, onFocus }) {
  const { onLinkClick } = useLeaveTo();
  const project = stop.projectId !== null;

  const label = project ? (
    <p
      className="m-0 font-medium"
      style={{ fontSize: u(18), lineHeight: LEADING, color: red(1) }}
    >
      {stop.label}
      {/* Only the stop that leaves the page carries the arrow; the other
          project stops in the window move the focus here instead. */}
      {focused && (
        <motion.span
          style={{ fontSize: u(16) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {" ↗"}
        </motion.span>
      )}
    </p>
  ) : (
    <p
      className="m-0 font-medium"
      style={{ fontSize: u(15), lineHeight: LEADING, color: red(0.7) }}
    >
      {stop.label}
    </p>
  );

  return (
    <div data-exit className="flex items-center">
      {/* The tick slot's centre is the axis. A project gets the heavy tick. */}
      <div
        className="flex shrink-0 items-center justify-center"
        style={{ width: u(28), height: u(20) }}
      >
        <div
          className={`transition-[width,height,background-color] ${SETTLE}`}
          style={{
            width: u(project ? 26 : 14),
            height: u(project ? 3 : 2),
            backgroundColor: red(project ? 1 : 0.6),
          }}
        />
      </div>

      <div
        className="flex min-w-0 flex-1 flex-col"
        style={{ paddingLeft: u(18), gap: u(3) }}
      >
        {/* The project in focus links to its page; any other project stop in
            the window brings it into focus instead. */}
        {project && focused ? (
          <Link
            href={`/after-hours/project/${stop.projectId}`}
            onClick={onLinkClick}
            className="decoration-[var(--main-red)] decoration-1 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--main-red)]"
          >
            {label}
          </Link>
        ) : project ? (
          <button
            type="button"
            onClick={onFocus}
            aria-label={`Bring ${stop.label} into focus`}
            className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--main-red)]"
          >
            {label}
          </button>
        ) : (
          label
        )}

        {stop.note && (
          <p
            className="m-0"
            style={{ fontSize: u(13), lineHeight: LEADING, color: red(0.5) }}
          >
            {stop.note}
          </p>
        )}
      </div>
    </div>
  );
}

// `zoneRef` is the wheel zone: the clock and the stops, from the tick slot to
// the right edge and from the top of the clock to the bottom of the last stop.
// The glow and the axis's tail are decoration and stay out of it.
export default function TimelineTicker({
  stops,
  quarter,
  wraps,
  focusedId,
  onFocus,
  zoneRef,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig transition={reduceMotion ? { duration: 0 } : SETTLE_MOTION}>
      <div style={{ width: u(388), paddingLeft: u(GUTTER) }}>
        <div ref={zoneRef} className="relative">
          {/* The axis runs from below the clock to a little past the last stop. */}
          <div
            data-exit
            className="pointer-events-none absolute"
            style={{
              left: u(109 - GUTTER),
              top: u(45),
              bottom: u(-58),
              width: u(2),
              backgroundColor: red(0.3),
            }}
          />

          <div
            data-exit
            className="pointer-events-none absolute"
            style={{
              left: u(113 - GUTTER),
              top: u(-65),
              width: u(191.127),
              height: u(59.089),
              borderRadius: u(65.8),
              backgroundColor: red(0.39),
              filter: `blur(${u(29.82)})`,
            }}
          />
          <FlipClock
            data-exit
            value={quarter}
            wraps={wraps}
            className="absolute"
            style={{ left: u(109 - GUTTER), top: u(-56) }}
          />

          <ul
            className="m-0 flex list-none flex-col p-0"
            style={{ paddingTop: u(55), gap: u(15) }}
          >
            {/* As the window slides, the stops that stay glide to their new
              places while the one leaving fades out and the one arriving
              fades in. */}
            <AnimatePresence initial={false} mode="popLayout">
              {stops.map((stop) => (
                <motion.li
                  className="m-0"
                  key={`${stop.quarter}-${stop.label}`}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Stop
                    stop={stop}
                    focused={stop.projectId === focusedId}
                    onFocus={() => onFocus(stop.projectId)}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </MotionConfig>
  );
}
