"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProjectRow from "./ProjectRow";
import FlipClock from "@/app/after-hours/components/FlipClock";
import ellipse from "@/app/assets/projects_ellipse.svg";
import { AFTER_HOURS } from "@/lib/content";
import { CATEGORIES, PROJECTS } from "@/lib/projects";

// Wheel pixels per row, and how far past either end the list can be pulled
// before it springs back.
const WHEEL_PX_PER_ROW = 250;
const OVERSCROLL = 0.1;

// The After Hours flip clock draws 42.093px-wide cards per unit of --u; this
// frame's cards are 60 x 80.
const CLOCK_UNIT = `${60 / 42.093}px`;

// Only the "project" kind is listed here; "portfolio" pieces are for later.
const ITEMS = PROJECTS.filter((p) => p.kind === "project");

const projectHref = (project) => `/after-hours/project/${project.slug}`;

// /projects, from the Figma PROJECTS LANDING v2 frame (1675:793), reached
// from PROJECTS in the After Hours header: the projects run down a diagonal
// with the centered one enlarged. Scroll (wheel or arrow keys) moves along
// it, clicking an off-center project centers it, and clicking the centered
// one opens its case study. The categories (top right) and the flip clock
// (bottom left) follow whichever project is centered.
export default function ProjectsLanding() {
  const router = useRouter();
  const containerRef = useRef(null);
  const target = useMotionValue(0);
  const position = useSpring(target, { damping: 20, stiffness: 100 });
  const [active, setActive] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [viewport, setViewport] = useState(null);

  const last = ITEMS.length - 1;
  const project = ITEMS[active];

  useEffect(() => {
    const measure = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(position, "change", (p) => {
    setActive(Math.max(0, Math.min(last, Math.round(p))));
  });

  const goTo = useCallback(
    (index) => target.set(Math.max(0, Math.min(last, index))),
    [target, last],
  );

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
      const next = target.get() + e.deltaY / WHEEL_PX_PER_ROW;
      target.set(Math.max(-OVERSCROLL, Math.min(last + OVERSCROLL, next)));
    };
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [target, last]);

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

  const handleRowClick = useCallback(
    (index) => {
      if (index !== Math.round(target.get())) {
        goTo(index);
        return;
      }
      setIsNavigating(true);
      // Let the slide-out start before the route change.
      setTimeout(() => router.push(projectHref(ITEMS[index])), 300);
    },
    [target, goTo, router],
  );

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[var(--main-beige)] [font-family:var(--font-family-primary)]"
    >
      <div
        className="pointer-events-none absolute left-[54.79%] top-[-214px] h-[905px] w-[1070px]"
        aria-hidden="true"
      >
        <div className="absolute inset-[-16.3%_-13.79%]">
          <Image src={ellipse} alt="" className="block size-full max-w-none" />
        </div>
      </div>

      {viewport &&
        ITEMS.map((p, index) => (
          <ProjectRow
            key={p.slug}
            project={p}
            index={index}
            position={position}
            viewport={viewport}
            isNavigating={isNavigating}
            onClick={handleRowClick}
          />
        ))}

      <ul className="absolute right-[42px] top-[109px] z-[200] text-right text-[24px] font-medium leading-[normal]">
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

      <motion.div
        className="absolute bottom-[95px] left-[81px] z-[200]"
        animate={isNavigating ? { x: -1200, opacity: 0 } : undefined}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div
          className="absolute left-[20px] top-[9px] h-[89px] w-[288px] rounded-[94px] bg-[rgba(203,0,0,0.39)] blur-[42.6px]"
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
      </motion.div>
    </div>
  );
}
