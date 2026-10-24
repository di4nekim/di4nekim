"use client";

import Link from "next/link";
import { red, SETTLE, u } from "@/app/after-hours/components/frame";
import { useLeaveTo } from "@/app/after-hours/components/leave";

// One project on the /projects diagonal: a copy of the After Hours blurb
// (Figma "project blurbs v9", 1664:343), kept separate so /projects can
// diverge from it. ProjectRow places it; the row centres itself on its
// parent's top edge.
//
// `depth` is the row's signed distance from the centered project: 0 is the one
// in focus, ±1 the neighbours, ±2 the pair beyond them. Past that the row is
// hidden.
//
// The three steps below are the design's depth of field, and it is the only
// thing marking the focused project — no highlight, no plate, no chrome.
const DEPTH = [
  { height: 189, title: 52, body: 19, ink: 1, meta: 0.55, blur: 0 },
  { height: 147, title: 33, body: 14, ink: 0.46, meta: 0.32, blur: 2 },
  { height: 147, title: 33, body: 14, ink: 0.2, meta: 0.13, blur: 4.8 },
];

// Figma's "normal" line height for Inter.
const LEADING = 1.21;

// Where the bar starts, from the row's left edge: the title column plus the
// gap after it. ProjectRow lines the bars up on the diagonal by this.
export const BAR_X = 310 + 40;

export default function ProjectBlurb({ project, depth, onFocus }) {
  const { leaveTo, onLinkClick } = useLeaveTo();
  const distance = Math.abs(depth);
  const { height, title, body, ink, meta, blur } = DEPTH[Math.min(distance, 2)];
  const focused = depth === 0;
  // Past ±2 the row is only there to fade out to.
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
    // Clips while it changes depth, but not while its parts leave the page.
    <div
      data-exit-unclip
      aria-hidden={spent || undefined}
      onClick={focused ? openCaseStudy : undefined}
      className={`absolute left-0 flex ${focused ? "cursor-pointer" : ""} overflow-hidden text-left transition-[top,height,filter,opacity] ${SETTLE} has-[>button:focus-visible]:outline has-[>button:focus-visible]:outline-2 has-[>button:focus-visible]:outline-offset-4 has-[>button:focus-visible]:outline-[var(--main-red)]`}
      style={{
        top: u(-height / 2),
        height: u(height),
        width: u(886),
        gap: u(40),
        filter: `blur(${u(blur)})`,
        opacity: spent ? 0 : 1,
      }}
    >
      {/* The row leaves the page as its three parts; see After Hours' leave.js. */}
      {/* The title sits on the row's floor and against the bar, so the gap
          either side of the bar is the same. */}
      <div
        data-exit
        className="flex shrink-0 flex-col justify-end"
        style={{ width: u(310) }}
      >
        <p
          className={`m-0 text-right italic transition-[font-size,color] ${SETTLE}`}
          style={{ fontSize: u(title), lineHeight: LEADING, color: red(ink) }}
        >
          {/* A word a line, as in the design — and as the old project list set
              it. The months tag leads the last word, to its left. */}
          {words.map((word, i) => (
            <span className="block" key={`${word}-${i}`}>
              {i === words.length - 1 && (
                <span
                  className={`font-medium not-italic transition-colors ${SETTLE}`}
                  style={{
                    fontSize: u(12),
                    color: red(meta),
                    marginRight: u(14),
                  }}
                >
                  {`(${project.months})`}
                </span>
              )}
              {word}
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
