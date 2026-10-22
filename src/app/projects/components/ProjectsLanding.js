"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";
import Image from "next/image";
import ProjectRow, { FOCUS_X, FOCUS_Y } from "./ProjectRow";
import FlipClock from "@/app/after-hours/components/FlipClock";
import { returningFrom, usePullIn } from "@/app/after-hours/components/leave";
import { u } from "@/app/after-hours/components/frame";
import ellipse from "@/app/assets/projects_ellipse.svg";
import blurbBloom from "@/app/assets/after-hours/blurb-bloom.svg";
import { AFTER_HOURS } from "@/lib/content";
import { CASE_STUDIES_BY_KIND, CATEGORIES } from "@/lib/projects";

// Wheel pixels per row.
const WHEEL_PX_PER_ROW = 250;

// Rows past ±2 are the buffer rows fade in and out through.
const BUFFER = 3;

// The After Hours flip clock draws 42.093px-wide cards per unit of --u; this
// frame's cards are 60 x 80.
const CLOCK_UNIT = `${60 / 42.093}px`;

// Only the "project" kind is listed here; "portfolio" pieces get /portfolio.
const ITEMS = CASE_STUDIES_BY_KIND.project;

const wrap = (slot) => ((slot % ITEMS.length) + ITEMS.length) % ITEMS.length;

// /projects, from the Figma PROJECTS LANDING v2 frame (1675:793), reached
// from PROJECTS in the After Hours header: the projects run down a diagonal
// as After Hours blurbs, the centered one in focus. Scroll (wheel or arrow
// keys) moves along it, with no ends: past the last project it comes round
// to the first. Clicking an off-center project centers it, and clicking the
// centered one opens its case study. The categories (top right)
// and the flip clock (bottom left) follow whichever project is centered.
// Back from a case study, that project is centered and the page pulls in from
// the left, as After Hours does.
export default function ProjectsLanding() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  // Positions are unbounded slots, not indices: slot s shows ITEMS[wrap(s)].
  const [start] = useState(() =>
    Math.max(
      0,
      ITEMS.findIndex((p) => p.id === returningFrom()),
    ),
  );
  const target = useMotionValue(start);
  const position = useSpring(target, { damping: 20, stiffness: 100 });
  const [active, setActive] = useState(start);
  const [viewport, setViewport] = useState(null);

  // The rows only mount once the window is measured.
  usePullIn(sceneRef, viewport !== null);

  const project = ITEMS[wrap(active)];

  useEffect(() => {
    const measure = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(position, "change", (p) => {
    setActive(Math.round(p));
  });

  const goTo = useCallback((slot) => target.set(slot), [target]);

  // Snap to the nearest row once scrolling settles.
  useEffect(() => {
    let timeout;
    const unsubscribe = target.on("change", (p) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => goTo(Math.round(p)), 150);
    });
    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [target, goTo]);

  // Non-passive so preventDefault stops the page from scrolling instead.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onWheel = (e) => {
      e.preventDefault();
      target.set(target.get() + e.deltaY / WHEEL_PX_PER_ROW);
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [target]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowDown") goTo(Math.round(target.get()) + 1);
      else if (e.key === "ArrowUp") goTo(Math.round(target.get()) - 1);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [target, goTo]);

  // Rows are keyed by slot, not project, so the window slides along an
  // endless list while rows that run out of it unmount.
  const slots = [];
  for (let slot = active - BUFFER; slot <= active + BUFFER; slot++) {
    slots.push(slot);
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--main-beige)]"
    >
      <div
        className="pointer-events-none absolute left-[62%] top-[-655px] h-[905px] w-[1070px]"
        aria-hidden="true"
      >
        <div className="absolute inset-[-16.3%_-13.79%]">
          <Image src={ellipse} alt="" className="block size-full max-w-none" />
        </div>
      </div>

      {/* Opening a case study plays the After Hours exit (see leave.js) on
          what's in here; the background stays behind. The exit copies this
          box out of the page, so what the blurbs inherit is set here, not on
          the page: --u, one design pixel of the 1440 x 1025 frame, and the
          font. */}
      <div
        ref={sceneRef}
        data-exit-scene
        className="absolute inset-0 [--u:min(100vw/1440,100vh/1025)] [font-family:var(--font-family-primary)]"
      >
        {/* The After Hours blurb bloom, set behind the centered row where
            /after-hours sets it behind its focused one: 952 x 245, its left
            edge 428 left of the bar and its top 128.5 above the row's centre.
            The ellipse carries its own blur, so the SVG overhangs this box. */}
        <div
          data-exit
          className="pointer-events-none absolute"
          style={{
            left: `calc(${FOCUS_X * 100}vw - ${u(428)})`,
            top: `calc(${FOCUS_Y * 100}vh - ${u(128.5)})`,
            width: u(952),
            height: u(245),
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-[-60.2%_-15.49%]">
            <Image src={blurbBloom} alt="" className="block size-full" />
          </div>
        </div>

        {viewport &&
          slots.map((slot) => (
            <ProjectRow
              key={slot}
              project={ITEMS[wrap(slot)]}
              slot={slot}
              depth={slot - active}
              position={position}
              viewport={viewport}
              onFocus={goTo}
            />
          ))}

        <ul
          data-exit
          className="absolute right-[42px] top-[109px] z-[200] text-right text-[24px] font-medium leading-[normal]"
        >
          {CATEGORIES.project.map((category) => (
            <li
              key={category.id}
              className={`transition-colors duration-300 ${
                category.id === project.category
                  ? "text-[var(--main-red)]"
                  : "text-[rgba(203,0,0,0.4)]"
              }`}
            >
              {category.label}
            </li>
          ))}
        </ul>

        <div data-exit className="absolute bottom-[145px] left-[131px] z-[200]">
          <div
            className="absolute left-[20px] top-[9px] h-[89px] w-[288px] rounded-[94px] bg-[rgba(203,0,0,0.2)] blur-[42.6px]"
            aria-hidden="true"
          />
          <p className="relative mb-[8px] text-[15px] leading-[normal] text-[var(--main-red)]">
            {AFTER_HOURS.clockLabel}
          </p>
          <FlipClock
            value={project.quarter}
            className="relative"
            style={{ "--u": CLOCK_UNIT }}
            aria-label={project.quarter}
          />
        </div>
      </div>
    </div>
  );
}
