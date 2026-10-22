"use client";

import { motion, useTransform } from "framer-motion";
import ProjectBlurb, { BAR_X } from "./ProjectBlurb";
import { u } from "@/app/after-hours/components/frame";

// Where a row's bar sits, by its offset from the centered row, as a fraction
// of the 1440x1025 Figma frame (PROJECTS LANDING v2): x is the bar's left
// edge, y its vertical centre. Offsets past ±2 extrapolate along the last
// step. The whole diagonal sits SHIFT_X right of and SHIFT_Y below the Figma
// frame, to bring the centered blurb further right and down on screen.
const OFFSETS = [-2, -1, 0, 1, 2];
const SHIFT_X = 210;
const SHIFT_Y = 50;
const ROW_X = [94, 374, 554.41, 911.86, 1191.86].map(
  (x) => (x + SHIFT_X) / 1440,
);
const ROW_Y = [8.5, 220.5, 469, 700.5, 912.5].map((y) => (y + SHIFT_Y) / 1025);

// The centered row's anchor, as fractions of the viewport.
export const FOCUS_X = ROW_X[2];
export const FOCUS_Y = ROW_Y[2];

// One project's blurb, placed on the /projects diagonal. `position` is the
// menu's (smoothed) scroll position in rows and `slot` this row's place in
// the endless list, so `slot - position` is its signed distance from center;
// `depth` is the same, rounded, and sets the blurb's depth of field.
export default function ProjectRow({
  project,
  slot,
  depth,
  position,
  viewport,
  onFocus,
}) {
  const offset = useTransform(position, (p) => slot - p);
  const distance = useTransform(offset, Math.abs);

  const x = useTransform(
    offset,
    OFFSETS,
    ROW_X.map((f) => f * viewport.width),
    { clamp: false },
  );
  const y = useTransform(
    offset,
    OFFSETS,
    ROW_Y.map((f) => f * viewport.height),
    { clamp: false },
  );
  const zIndex = useTransform(distance, (d) => 100 - Math.round(d * 10));
  const hidden = useTransform(distance, (d) => (d > 3 ? "hidden" : "visible"));

  return (
    // Zero-size anchor at the bar's left edge, halfway down it.
    <motion.div
      className="absolute left-0 top-0"
      style={{ x, y, zIndex, visibility: hidden }}
    >
      <div className="absolute top-0" style={{ left: u(-BAR_X) }}>
        <ProjectBlurb
          project={project}
          depth={depth}
          onFocus={() => onFocus(slot)}
        />
      </div>
    </motion.div>
  );
}
