"use client";

import Link from "next/link";
import { red, SETTLE, u } from "./frame.js";

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
  // focus; in focus it is a plain block and the eyebrow carries the link.
  const Row = focused || spent ? "div" : "button";

  return (
    <Row
      {...(Row === "button"
        ? {
            type: "button",
            onClick: onFocus,
            "aria-label": `Bring ${project.title} into focus`,
          }
        : { "aria-hidden": spent || undefined })}
      className={`absolute left-0 flex overflow-hidden text-left transition-[top,height,filter,opacity] ${SETTLE} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--main-red)]`}
      style={{
        top: u(Math.sign(depth) * CENTRE[distance] + AXIS - height / 2),
        height: u(height),
        width: u(886),
        gap: u(40),
        filter: `blur(${u(blur)})`,
        opacity: spent ? 0 : 1,
      }}
    >
      <div className="shrink-0" style={{ width: u(310) }}>
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
        className={`h-full shrink-0 transition-colors ${SETTLE}`}
        style={{ width: u(6), backgroundColor: red(ink) }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
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

        {focused ? (
          <Link
            href={`/after-hours/project/${project.id}`}
            aria-label={`${project.title} — case study`}
            className={`${eyebrow} mt-auto hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--main-red)]`}
            style={eyebrowStyle}
          >
            {"CASE STUDY  ↗"}
          </Link>
        ) : (
          <p className={`${eyebrow} mt-auto`} style={eyebrowStyle}>
            {"CASE STUDY  ↗"}
          </p>
        )}
      </div>
    </Row>
  );
}
