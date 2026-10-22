"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";
import divider from "@/app/assets/project_divider.svg";
import dividerFocused from "@/app/assets/project_divider_focused.svg";

// Where a row's divider sits, by its offset from the centered row, as a
// fraction of the 1440x1025 Figma frame (PROJECTS LANDING v2). The centered
// row is 1.3x the others, so the steps either side of it are uneven. Offsets
// past ±2 extrapolate along the last step.
const OFFSETS = [-2, -1, 0, 1, 2];
const DIVIDER_X = [94, 374, 554.41, 911.86, 1191.86].map((x) => x / 1440);
const DIVIDER_Y = [-74, 138, 362, 618, 830].map((y) => y / 1025);
const FOCUSED_SCALE = 1.3;

// Base (unfocused) metrics from the Figma rows; the centered row multiplies
// each by FOCUSED_SCALE, except the title gap, which the design opens up
// more than that.
const TITLE_SIZE = 48;
const BODY_SIZE = 20;
const DIVIDER_HEIGHT = 165;
const TITLE_GAP = [35, 65]; // title's right edge → divider, [off-center, centered]
const BODY_GAP = 52; // divider → description
const BODY_WIDTH = 510;
const YEAR_GAP = 18; // year → last title line
const TITLE_DROP = 12; // title's last line sits this far below the divider

const px = (n) => `${n}px`;

// `position` is the menu's (smoothed) scroll position in rows, so
// `position - index` is this row's signed distance from center.
export default function ProjectRow({
  project,
  index,
  position,
  viewport,
  isNavigating,
  onClick,
}) {
  const offset = useTransform(position, (p) => index - p);
  const distance = useTransform(offset, Math.abs);

  const x = useTransform(
    offset,
    OFFSETS,
    DIVIDER_X.map((f) => f * viewport.width),
    { clamp: false },
  );
  const y = useTransform(
    offset,
    OFFSETS,
    DIVIDER_Y.map((f) => f * viewport.height),
    { clamp: false },
  );

  // 1 when centered, 0 from one row away.
  const focus = useTransform(distance, [0, 1], [1, 0]);
  const scale = useTransform(focus, [0, 1], [1, FOCUSED_SCALE]);
  // Off-center rows dim their text (the divider SVGs carry their own alpha),
  // then the whole row fades out past two rows away.
  const color = useTransform(
    distance,
    [0, 1],
    ["rgba(203, 0, 0, 1)", "rgba(203, 0, 0, 0.3)"],
  );
  const opacity = useTransform(distance, [2, 3], [1, 0]);
  const filter = useTransform(
    distance,
    [0, 1, 2],
    ["blur(0px)", "blur(2px)", "blur(3px)"],
  );
  const zIndex = useTransform(distance, (d) => 100 - Math.round(d * 10));
  const hidden = useTransform(distance, (d) => (d > 3 ? "hidden" : "visible"));

  const titleSize = useTransform(scale, (s) => px(TITLE_SIZE * s));
  const bodySize = useTransform(scale, (s) => px(BODY_SIZE * s));
  const dividerHeight = useTransform(scale, (s) => px(DIVIDER_HEIGHT * s));
  const titleRight = useTransform(focus, [0, 1], TITLE_GAP.map(px));
  const titleTop = useTransform(scale, (s) =>
    px((DIVIDER_HEIGHT + TITLE_DROP) * s),
  );
  const bodyLeft = useTransform(scale, (s) => px(BODY_GAP * s));
  const bodyWidth = useTransform(scale, (s) => px(BODY_WIDTH * s));
  const yearGap = useTransform(scale, (s) => px(YEAR_GAP * s));
  const unfocusedLine = useTransform(focus, (f) => 1 - f);

  const words = project.title.split(" ");
  const lastWord = words.pop();

  return (
    // Zero-size anchor at the divider's top-left; the title hangs off to the
    // left of it and the description to the right.
    <motion.div
      className="absolute left-0 top-0"
      style={{ x, y, opacity, filter, zIndex, visibility: hidden }}
      animate={isNavigating ? { x: -1200, opacity: 0 } : undefined}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.button
        type="button"
        onClick={() => onClick(index)}
        aria-label={`View project: ${project.title}`}
        className="block cursor-pointer text-left italic focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--main-red)]"
        style={{ color }}
      >
        <motion.span
          className="absolute flex -translate-y-full flex-col items-end whitespace-nowrap text-right leading-[normal]"
          style={{ right: titleRight, top: titleTop, fontSize: titleSize }}
        >
          {words.map((word, i) => (
            <span key={i}>{word}</span>
          ))}
          <span className="flex items-baseline">
            <motion.span style={{ fontSize: bodySize, marginRight: yearGap }}>
              (‘{project.year})
            </motion.span>
            {lastWord}
          </span>
        </motion.span>

        <motion.span
          className="absolute left-0 top-0 flex w-[2px] items-center justify-center"
          style={{ height: dividerHeight }}
        >
          <motion.span
            className="absolute rotate-[90.69deg]"
            style={{ opacity: unfocusedLine }}
          >
            <Image
              src={divider}
              alt=""
              aria-hidden="true"
              loading="eager"
              className="max-w-none"
            />
          </motion.span>
          <motion.span
            className="absolute rotate-[90.69deg]"
            style={{ opacity: focus }}
          >
            <Image
              src={dividerFocused}
              alt=""
              aria-hidden="true"
              loading="eager"
              className="max-w-none"
            />
          </motion.span>
        </motion.span>

        <motion.span
          className="absolute top-0 flex flex-col gap-[1.21em] leading-[normal]"
          style={{ left: bodyLeft, width: bodyWidth, fontSize: bodySize }}
        >
          {project.blurb.map((paragraph, i) => (
            <span key={i}>{paragraph}</span>
          ))}
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
