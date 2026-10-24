"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HEADER } from "@/lib/content";
import { EASE } from "./DiagonalReveal.js";

// An underline that draws left to right on hover. inline-block so both links'
// boxes span the full line height and the underlines sit at the same depth.
const LINK_CLASS =
  "inline-block text-[#F5EFE8] bg-no-repeat [background-image:linear-gradient(currentColor,currentColor)] [background-position:0_100%] [background-size:0%_2px] [transition:background-size_0.3s_ease] hover:[background-size:100%_2px]";

// "DIANE KIM, AFTER HOURS" in the After Hours header: two links, home and the
// After Hours landing. DI4NEKIM is in place from the start; ", AFTER HOURS"
// slides out from behind it to the right.
export default function AfterHoursName() {
  const reduceMotion = useReducedMotion();
  return (
    <span className="inline-flex text-[#F5EFE8]">
      <Link className={LINK_CLASS} href="/">
        {HEADER.name}
      </Link>
      <span className="inline-block overflow-hidden">
        <motion.span
          className="inline-block whitespace-pre"
          initial={reduceMotion ? false : { x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
        >
          {", "}
          <Link className={LINK_CLASS} href="/after-hours">
            {HEADER.afterHoursName}
          </Link>
        </motion.span>
      </span>
    </span>
  );
}
