"use client";

import Link from "next/link";
import { red, SETTLE, u } from "./frame.js";
import { useLeaveTo } from "./leave.js";

// One row of the blurb column in Figma's "project blurbs v9" (1664:343).
//
// `depth` is the row's signed distance from the focused project: 0 is the one
// in focus, ±1 the neighbours, ±2 the pair beyond them. ±3 is the buffer that
// rows enter and leave through, so nothing pops in at the edges of the column.
//
// The three steps below are the design's depth of field, and it is the only
// thing marking the focused project — no highlight, no plate, no chrome.
const DEPTH = [
  { height: 189, title: 52, body: 19, ink: 1, meta: 0.55, blur: 0 },
  { height: 147, title: 33, body: 14, ink: 0.46, meta: 0.32, blur: 2 },
  { height: 147, title: 33, body: 14, ink: 0.2, meta: 0.13, blur: 4.8 },
];

// Centre-to-centre distance from the focused row outwards: half of each row
// either side of the 44px column gap. The focused row is the tall one, so the
// first step out is the odd one.
const CENTRE = [0, 212, 403, 594];

// Half the column's 953px height — the focused row's centre sits here.
const AXIS = 476.5;

// Figma's "normal" line height for Inter.
const LEADING = 1.21;

export default function ProjectBlurb({ project, depth, onFocus }) {
  const { leaveTo, onLinkClick } = useLeaveTo();
  const distance = Math.abs(depth);
  const { height, title, body, ink, meta, blur } = DEPTH[Math.min(distance, 2)];
  const focused = depth === 0;
  // Past ±2 the row is only there to animate in from.
  const spent = distance > 2;

  const words = project.title.split(" ");
  const eyebrow = `transition-colors ${SETTLE} m-0 whitespace-pre font-medium`;
  const eyebrowStyle = {
    fontSize: u(12),
    lineHeight: LEADING,
    letterSpacing: u(1.2),
    color: red(meta),
  };

  // Out of focus the whole row is the control that brings a project into
  // focus; in focus it is a plain block and the eyebrow carries the link. The
  // row itself stays one element either way, with the control laid over it,
  // so a row changing depth transitions instead of being swapped out.
  const clickable = !focused && !spent;
  const href = `/after-hours/project/${project.id}`;

  // In focus, a click anywhere on the row opens the case study too. That is a
  // mouse convenience only: the eyebrow stays the one real link, for keyboards
  // and screen readers, and the only thing that underlines on hover.
  const openCaseStudy = (event) => {
    if (event.target.closest("a")) return;
    leaveTo(href);
  };

  return (
    <div
      aria-hidden={spent || undefined}
      onClick={focused ? openCaseStudy : undefined}
      className={`absolute left-0 flex ${focused ? "cursor-pointer" : ""} overflow-hidden text-left transition-[top,height,filter,opacity] ${SETTLE} has-[>button:focus-visible]:outline has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-offset-4 has-[>button:focus-visible]:outline-[var(--main-red)]`}
      style={{
        top: u(Math.sign(depth) * CENTRE[distance] + AXIS - height / 2),
        height: u(height),
        width: u(886),
        gap: u(40),
        filter: `blur(${u(blur)})`,
        opacity: spent ? 0 : 1,
      }}
    >
      {/* The row leaves the page as its three parts; see leave.js. */}
      <div data-exit className="shrink-0" style={{ width: u(310) }}>
        <p
          className={`m-0 italic transition-[font-size,color] ${SETTLE}`}
          style={{ fontSize: u(title), lineHeight: LEADING, color: red(ink) }}
        >
          {/* A word a line, as in the design — and as the old project list set
              it. The months tag trails the last word. */}
          {words.map((word, i) => (
            <span className="block" key={`${word}-${i}`}>
              {word}
              {i === words.length - 1 && (
                <span
                  className={`font-medium not-italic transition-colors ${SETTLE}`}
                  style={{ fontSize: u(12), color: red(meta) }}
                >
                  {` (${project.months})`}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      <div
        data-exit
        className={`h-full shrink-0 transition-colors ${SETTLE}`}
        style={{ width: u(6), backgroundColor: red(ink) }}
      />

      <div data-exit className="flex min-w-0 flex-1 flex-col">
        <div
          className={`italic transition-[font-size,color] ${SETTLE}`}
          style={{ fontSize: u(body), lineHeight: LEADING, color: red(ink) }}
        >
          {/* A blank line between paragraphs, as the design sets them. */}
          {project.blurb.map((paragraph, i) => (
            <p className={`m-0 ${i ? "mt-[1.21em]" : ""}`} key={i}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Always the link, so its colour transitions with the row; out of
            focus it sits under the row's control and out of the tab order. */}
        <Link
          href={href}
          aria-label={`${project.title} — case study`}
          aria-hidden={!focused || undefined}
          tabIndex={focused ? undefined : -1}
          onClick={onLinkClick}
          className={`${eyebrow} mt-auto hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--main-red)]`}
          style={eyebrowStyle}
        >
          {"CASE STUDY  ↗"}
        </Link>
      </div>

      {clickable && (
        <button
          type="button"
          onClick={onFocus}
          aria-label={`Bring ${project.title} into focus`}
          className="absolute inset-0 focus-visible:outline-none"
        />
      )}
    </div>
  );
}
