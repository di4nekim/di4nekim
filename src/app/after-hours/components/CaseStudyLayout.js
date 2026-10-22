"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AFTER_HOURS } from "@/lib/content";
import { FADE_UP } from "./CaseStudyMarkdown.js";
import { SETTLE } from "./frame.js";

// The case study's column, shared with its loading skeleton so the two line
// up. The top padding clears the fixed header (50px, 65px from sm), the back
// link's row and the space above the title.
export const MAIN =
  "mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 pb-24 pt-[158px] text-[#CB0000] sm:px-8 sm:pt-[205px]";

// Pinned under the header in the top left. At rest it's only the arrow; on
// hover (or keyboard focus) the label slides out to its right. The link is
// only as big as what's showing, so nothing around it is clickable.
export function BackLink({ onClick }) {
  return (
    <motion.div
      data-exit
      variants={FADE_UP}
      className="fixed left-6 top-[74px] z-[999] sm:left-8 sm:top-[97px]"
    >
      <Link
        href="/after-hours"
        onClick={onClick}
        className="group flex items-center text-lg leading-7 text-[#CB0000] outline-none focus-visible:underline focus-visible:underline-offset-4"
      >
        <span aria-hidden="true">←</span>
        <span
          className={`grid grid-cols-[0fr] transition-[grid-template-columns] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] ${SETTLE}`}
        >
          <span className="overflow-hidden whitespace-nowrap">
            <span
              className={`inline-block -translate-x-full pl-1 opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${SETTLE}`}
            >
              {AFTER_HOURS.backLink}
            </span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
