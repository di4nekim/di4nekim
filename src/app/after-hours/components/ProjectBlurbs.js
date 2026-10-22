"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProjectBlurb from "./ProjectBlurb.js";
import TimelineTicker from "./TimelineTicker.js";
import { box, u } from "./frame.js";
import blurbBloom from "../../assets/after-hours/blurb-bloom.svg";
import tickerBloom from "../../assets/after-hours/ticker-bloom.svg";
import { PROJECTS, TIMELINE } from "@/lib/content";

// Figma: "project blurbs v9" (1664:340). Composed on the 1440 × 1024 frame;
// `--u` is one design pixel, scaled so the frame fits the section, so every
// number below is the Figma number as-is.
//
// The screen is one control: a column of project blurbs with the one in focus
// sharp and the rest falling out of focus either side of it, and a rail on the
// right that indexes the same projects against everything else that happened
// around them. Scrolling over the section moves the focus rather than the
// page — until the focus reaches an end of the list, when the page takes the
// wheel back so the footer stays reachable.
//
// The column wraps and the rail does not. The column is a depth of field with
// no ends to show, and the design fills every slot either side of the focus;
// the rail is a chronology, so at the ends of it the window stops sliding.

// Rows past ±2 are the buffer the column animates through; see ProjectBlurb.
const BUFFER = 3;
// The rail shows five stops, the focused project's and two either side.
const WINDOW = 5;
// Roughly one notch of a mouse wheel.
const NOTCH = 120;
// Long enough that a flick on a trackpad steps once, not four times.
const COOLDOWN = 320;

const wrap = (slot) =>
  ((slot % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;

export default function ProjectBlurbs() {
  const [focus, setFocus] = useState(0);
  const sectionRef = useRef(null);
  // The wheel listener is attached once, so it reads the focus from a ref.
  const focusRef = useRef(focus);
  const travel = useRef(0);
  const settledAt = useRef(0);

  const last = PROJECTS.length - 1;

  const moveTo = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(last, next));
      focusRef.current = clamped;
      setFocus(clamped);
    },
    [last],
  );

  useEffect(() => {
    const section = sectionRef.current;

    const onWheel = (event) => {
      const direction = Math.sign(event.deltaY);
      const atEnd =
        (direction > 0 && focusRef.current === last) ||
        (direction < 0 && focusRef.current === 0);
      // At either end the wheel belongs to the page again.
      if (!direction || atEnd) return;

      event.preventDefault();

      const now = performance.now();
      if (now - settledAt.current < COOLDOWN) return;

      travel.current += event.deltaY;
      if (Math.abs(travel.current) < NOTCH) return;

      settledAt.current = now;
      travel.current = 0;
      moveTo(focusRef.current + direction);
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [last, moveTo]);

  const onKeyDown = (event) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[
      event.key
    ];
    if (step) {
      event.preventDefault();
      moveTo(focusRef.current + step);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(last);
    }
  };

  const project = PROJECTS[focus];

  // The column keeps its slots filled by wrapping: a slot is a position in the
  // column, and the project it carries runs off one end of the list and back
  // on at the other. Keying rows by slot rather than by project is what lets
  // the column slide while a row that has run out of the window unmounts.
  const slots = [];
  for (let slot = focus - BUFFER; slot <= focus + BUFFER; slot++) {
    slots.push(slot);
  }

  // The rail is one chronological list, so its window is clamped rather than
  // wrapped: at either end it stays five stops long and stops sliding.
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
      aria-label="Projects"
      className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[var(--main-beige)] [container-type:size] [font-family:var(--font-family-primary)] focus-visible:outline-none"
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [--u:min(100cqw/1440,100cqh/1024)]"
        style={{ width: u(1440), height: u(1024) }}
      >
        {/* Two blooms, each an ellipse carrying its own 73.75px blur, so the
            SVG overhangs the node box it is placed in. */}
        <div className="absolute" style={box(18, 416, 952, 245)}>
          <div className="absolute inset-[-60.2%_-15.49%]">
            <Image src={blurbBloom} alt="" className="block size-full" />
          </div>
        </div>
        <div className="absolute" style={box(1012, -295, 820, 744)}>
          <div className="absolute inset-[-19.83%_-17.99%]">
            <Image src={tickerBloom} alt="" className="block size-full" />
          </div>
        </div>

        <div className="absolute overflow-hidden" style={box(96, 68, 886, 953)}>
          {slots.map((slot) => (
            <ProjectBlurb
              key={slot}
              project={PROJECTS[wrap(slot)]}
              depth={slot - focus}
              onFocus={() => moveTo(wrap(slot))}
            />
          ))}
        </div>

        <div className="absolute" style={box(1012, 250)}>
          <TimelineTicker
            stops={TIMELINE.slice(start, start + WINDOW)}
            quarter={project.quarter}
            focusedId={project.id}
            onFocus={(id) => moveTo(PROJECTS.findIndex((p) => p.id === id))}
          />
        </div>
      </div>
    </section>
  );
}
