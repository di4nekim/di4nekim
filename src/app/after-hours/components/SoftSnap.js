"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

// Full-height sections marked with `data-soft-snap` are treated as stops.
// Once the page has scrolled `threshold` past the stop it is settled on, the
// rest of the way is animated: a nudge of the wheel carries you fully into
// the next section instead of leaving you halfway between two of them.
// Anything after the last marked section — the footer — scrolls as usual, and
// scrolling back up past the threshold carries you back the way you came.
//
// Stays disabled while `enabled` is false so the landing's entrance isn't cut
// short by an early scroll; when it flips on it checks the current position
// once, in case the scroll already happened.

// Matches the entrance easing in DiagonalReveal: quick off the mark, soft
// into place.
const EASE = [0.22, 1, 0.36, 1];

export default function SoftSnap({
  enabled = true,
  threshold = 100,
  duration = 1.2,
}) {
  const anchor = useRef(0);
  const snap = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tops = [];

    // The last stop at or above a scroll position is the one the page counts
    // as settled on, so a reload partway down starts from where it left off.
    const settledAt = (y) => {
      let index = 0;
      tops.forEach((top, i) => {
        if (y >= top - 1) index = i;
      });
      return index;
    };

    const measure = () => {
      tops = [...document.querySelectorAll("[data-soft-snap]")].map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
      anchor.current = settledAt(window.scrollY);
    };

    const snapTo = (index) => {
      if (index < 0 || index >= tops.length) return;
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      const target = Math.max(0, Math.min(tops[index], limit));
      anchor.current = index;
      if (Math.abs(window.scrollY - target) < 1) return;
      if (reduceMotion.matches) {
        window.scrollTo(0, target);
        return;
      }
      snap.current = animate(window.scrollY, target, {
        duration,
        ease: EASE,
        onUpdate: (y) => window.scrollTo(0, y),
        onComplete: () => {
          snap.current = null;
        },
      });
    };

    const check = () => {
      // Our own scrollTo calls land here too; ignore them.
      if (snap.current || !tops.length) return;
      const past = window.scrollY - tops[anchor.current];
      if (past > threshold) snapTo(anchor.current + 1);
      else if (past < -threshold) snapTo(anchor.current - 1);
    };

    // Capture phase, so a wheel mid-snap neither scrolls the page nor reaches
    // a section that handles the wheel itself.
    const hold = (event) => {
      if (!snap.current) return;
      event.preventDefault();
      event.stopPropagation();
    };
    const holdOpts = { passive: false, capture: true };

    measure();
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("wheel", hold, holdOpts);
    window.addEventListener("touchmove", hold, holdOpts);

    return () => {
      snap.current?.stop();
      snap.current = null;
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", measure);
      window.removeEventListener("wheel", hold, holdOpts);
      window.removeEventListener("touchmove", hold, holdOpts);
    };
  }, [enabled, threshold, duration]);

  return null;
}
