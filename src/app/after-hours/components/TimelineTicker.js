"use client";

import Link from "next/link";
import FlipClock from "./FlipClock.js";
import { red, SETTLE, u } from "./frame.js";

// Figma: "TIMELINE TICKER" (1664:356), the rail to the right of the blurbs.
// A five-stop window onto the one chronological list in content/site.md,
// centred on the stop of whichever project is in focus, with the clock at its
// head reading that project's quarter.
//
// Ticker labels are upright while the blurbs are italic. That contrast is
// what separates the index from the content, so no copy explains it.
const LEADING = 1.21;

function Stop({ stop, focused, onFocus }) {
  const project = stop.projectId !== null;

  const label = project ? (
    <p
      className="m-0 font-medium"
      style={{ fontSize: u(18), lineHeight: LEADING, color: red(1) }}
    >
      {stop.label}
      {/* Only the stop that leaves the page carries the arrow; the other
          project stops in the window move the focus here instead. */}
      {focused && <span style={{ fontSize: u(16) }}>{" ↗"}</span>}
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
    <div className="flex items-center" style={{ paddingLeft: u(96) }}>
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
            className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--main-red)]"
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

export default function TimelineTicker({ stops, quarter, focusedId, onFocus }) {
  return (
    <div className="relative" style={{ width: u(388) }}>
      {/* The axis runs from below the clock to a little past the last stop. */}
      <div
        className="absolute"
        style={{
          left: u(109),
          top: u(45),
          bottom: u(-58),
          width: u(2),
          backgroundColor: red(0.3),
        }}
      />

      <div
        className="absolute"
        style={{
          left: u(113),
          top: u(-65),
          width: u(191.127),
          height: u(59.089),
          borderRadius: u(65.8),
          backgroundColor: red(0.39),
          filter: `blur(${u(29.82)})`,
        }}
      />
      <FlipClock
        value={quarter}
        className="absolute"
        style={{ left: u(109), top: u(-56) }}
      />

      <ul
        className="m-0 flex list-none flex-col p-0"
        style={{ paddingTop: u(55), gap: u(15) }}
      >
        {stops.map((stop) => (
          <li className="m-0" key={`${stop.quarter}-${stop.label}`}>
            <Stop
              stop={stop}
              focused={stop.projectId === focusedId}
              onFocus={() => onFocus(stop.projectId)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
