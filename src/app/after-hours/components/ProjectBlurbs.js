"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProjectBlurb from "./ProjectBlurb.js";
import { returningFrom, usePullIn } from "./leave.js";
import TimelineTicker from "./TimelineTicker.js";
import { box, u } from "./frame.js";
import blurbBloom from "../../assets/after-hours/blurb-bloom.svg";
import tickerBloom from "../../assets/after-hours/ticker-bloom.svg";
import { TIMELINE } from "@/lib/content";
import { CASE_STUDIES } from "@/lib/projects";

// Figma: "project blurbs v9" (1664:340). Composed on the 1440 × 1024 frame;
// `--u` is one design pixel, scaled so the frame fits the section, so every
// number below is the Figma number as-is.
//
// The screen is one control: a column of project blurbs with the one in focus
// sharp and the rest falling out of focus either side of it, and a rail on the
// right that indexes the same projects against everything else that happened
// around them. Two zones take the wheel and move the focus: the blurb column,
// and the rail's clock and stops (which turns the clock's quarter). Anywhere
// else on the section — below the rail, in the margins — the wheel scrolls the
// page.
//
// The list has no ends: scrolling past the last project comes round to the
// first. The column wraps seamlessly — it is a depth of field with no ends to
// show. The rail is a chronology, so it can't: its window jumps from one end
// to the other, and the clock shuffles instead of flipping to mark the jump.

// Rows past ±2 are the buffer the column animates through; see ProjectBlurb.
const BUFFER = 3;
// The rail shows five stops, the focused project's and two either side.
const WINDOW = 5;
// Roughly one notch of a mouse wheel.
const NOTCH = 120;
// Long enough that a flick on a trackpad steps once, not four times.
const COOLDOWN = 320;

const wrap = (slot) =>
  ((slot % CASE_STUDIES.length) + CASE_STUDIES.length) % CASE_STUDIES.length;

// Which pass through the list a slot is on.
const lap = (slot) => Math.floor(slot / CASE_STUDIES.length);

export default function ProjectBlurbs() {
  // An unbounded slot, not an index: the focused project is `wrap(focus)`.
  // Back from a case study, that project is the one in focus.
  const [focus, setFocus] = useState(() =>
    Math.max(
      0,
      CASE_STUDIES.findIndex((p) => p.id === returningFrom()),
    ),
  );
  // How many times the focus has crossed between the ends of the list.
  const [wraps, setWraps] = useState(0);
  const sectionRef = useRef(null);
  const columnRef = useRef(null);
  const tickerRef = useRef(null);
  // The wheel listener is attached once, so it reads the focus from a ref.
  const focusRef = useRef(focus);
  const travel = useRef(0);
  const settledAt = useRef(0);

  usePullIn(sectionRef);

  const last = CASE_STUDIES.length - 1;

  const moveTo = useCallback((next) => {
    if (lap(next) !== lap(focusRef.current)) setWraps((n) => n + 1);
    focusRef.current = next;
    setFocus(next);
  }, []);

  // Moves to a project within the current pass, so it never counts as a wrap.
  const moveToIndex = (index) =>
    moveTo(focusRef.current - wrap(focusRef.current) + index);

  useEffect(() => {
    const zones = [columnRef.current, tickerRef.current];

    const onWheel = (event) => {
      const direction = Math.sign(event.deltaY);
      if (!direction) return;

      event.preventDefault();

      const now = performance.now();
      if (now - settledAt.current < COOLDOWN) return;

      travel.current += event.deltaY;
      if (Math.abs(travel.current) < NOTCH) return;

      settledAt.current = now;
      travel.current = 0;
      moveTo(focusRef.current + direction);
    };

    for (const zone of zones) {
      zone.addEventListener("wheel", onWheel, { passive: false });
    }
    return () => {
      for (const zone of zones) zone.removeEventListener("wheel", onWheel);
    };
  }, [moveTo]);

  const onKeyDown = (event) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key
    ];
    if (step) {
      event.preventDefault();
      moveTo(focusRef.current + step);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveToIndex(last);
    }
  };

  const project = CASE_STUDIES[wrap(focus)];

  // The column keeps its slots filled by wrapping: a slot is a position in the
  // column, and the project it carries runs off one end of the list and back
  // on at the other. Keying rows by slot rather than by project is what lets
  // the column slide while a row that has run out of the window unmounts.
  const slots = [];
  for (let slot = focus - BUFFER; slot <= focus + BUFFER; slot++) {
    slots.push(slot);
  }

  // The rail is one chronological list, so its window is clamped rather than
  // wrapped: at either end it stays five stops long and stops sliding, and a
  // wrap jumps it to the other end.
  const stopIndex = TIMELINE.findIndex((stop) => stop.projectId === project.id);
  const start = Math.max(
    0,
    Math.min(stopIndex - Math.floor(WINDOW / 2), TIMELINE.length - WINDOW),
  );

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      data-soft-snap
      aria-label="Projects"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--main-beige)] [container-type:size] [font-family:var(--font-family-primary)] focus-visible:outline-none"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [--u:min(100cqw/1440,100cqh/1024)]"
        style={{ width: u(1440), height: u(1024) }}
      >
        {/* Two blooms, each an ellipse carrying its own 73.75px blur, so the
            SVG overhangs the node box it is placed in. */}
        <div data-exit className="absolute" style={box(18, 416, 952, 245)}>
          <div className="absolute inset-[-60.2%_-15.49%]">
            <Image src={blurbBloom} alt="" className="block size-full" />
          </div>
        </div>
        <div data-exit className="absolute" style={box(1012, -295, 820, 744)}>
          <div className="absolute inset-[-19.83%_-17.99%]">
            <Image src={tickerBloom} alt="" className="block size-full" />
          </div>
        </div>

        <div
          ref={columnRef}
          data-exit-unclip
          className="absolute overflow-hidden"
          style={box(96, 68, 886, 953)}
        >
          {slots.map((slot) => (
            <ProjectBlurb
              key={slot}
              project={CASE_STUDIES[wrap(slot)]}
              depth={slot - focus}
              onFocus={() => moveTo(slot)}
            />
          ))}
        </div>

        <div className="absolute" style={box(1012, 250)}>
          <TimelineTicker
            stops={TIMELINE.slice(start, start + WINDOW)}
            quarter={project.quarter}
            wraps={wraps}
            focusedId={project.id}
            onFocus={(id) =>
              moveToIndex(CASE_STUDIES.findIndex((p) => p.id === id))
            }
            zoneRef={tickerRef}
          />
        </div>
      </div>
    </section>
  );
}
