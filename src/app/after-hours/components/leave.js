"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { animate } from "framer-motion";

// The move between the projects screen and a case study. Going in, every
// element marked `data-exit` that is on screen slides off to the left on its
// own, top of the screen first, while the case study's elements pull in from
// the right behind them (see PULL_IN in the case study page). Coming back is
// the same move mirrored: the case study's elements slide off to the right and
// the projects screen's pull in from the left (see usePullIn).
//
// Navigating unmounts this page, so the exit can't play on the page itself if
// the two are to overlap. It plays on a copy instead: the scene (the element
// marked `data-exit-scene`) is cloned into a fixed overlay where it sits, with
// everything but the leaving elements made invisible, and the real page is
// hidden under it. The navigation then goes ahead LEAD seconds in, and the
// case study arrives under the copy while the copy is still leaving.
//
// A clipping box marked `data-exit-unclip` stops clipping for the move, so
// what it holds slides off the page rather than out of the box.

const DURATION = 0.55;
const STAGGER = 0.03;
const EASE = [0.64, 0, 0.78, 0];
// How far into the exit the next page starts arriving: long enough that the
// first of the old elements are clear of the screen's left half before the
// new ones, which settle fast, reach their places.
const LEAD = 0.7;

// The pull-in back onto the projects screen: the case study's PULL_IN, a
// little quicker to settle.
const ARRIVE = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };
const ARRIVE_STAGGER = 0.035;

// Set on the way back from a case study, for the projects screen to read as
// it mounts: which project to come back to. Survives only in this tab's
// memory, so a reload or a fresh visit opens the page as usual.
let trip = null;

// Which project the page is coming back from, or null.
export const returningFrom = () => trip?.from ?? null;

// On-screen `data-exit` elements in `root`, top of the screen first. Hidden
// rows (the blurb column's buffer) have nothing to show moving; only hiding
// within `root` counts, as the exit's overlay is itself aria-hidden.
const movers = (root) =>
  [...root.querySelectorAll("[data-exit]")]
    .filter((el) => !root.contains(el.closest('[aria-hidden="true"]')))
    .map((el) => ({ el, rect: el.getBoundingClientRect() }))
    .filter(({ rect }) => onScreen(rect))
    .sort((a, b) => a.rect.top - b.rect.top || a.rect.left - b.rect.left)
    .map(({ el }) => el);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const onScreen = (rect) =>
  rect.bottom > 0 &&
  rect.top < window.innerHeight &&
  rect.right > 0 &&
  rect.left < window.innerWidth;

// The scene's copy, laid over the page exactly where the scene is.
function stage(scene) {
  const rect = scene.getBoundingClientRect();
  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.inert = true;
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "50",
    overflow: "hidden",
    pointerEvents: "none",
  });

  const copy = scene.cloneNode(true);
  Object.assign(copy.style, {
    position: "absolute",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    margin: "0",
    // Only the leaving elements show; the sections' fills and anything not
    // marked stay behind with the real page.
    visibility: "hidden",
  });
  for (const el of copy.querySelectorAll("[data-exit]")) {
    el.style.visibility = "visible";
  }
  for (const box of copy.querySelectorAll("[data-exit-unclip]")) {
    box.style.overflow = "visible";
  }

  overlay.append(copy);
  document.body.append(overlay);
  scene.style.visibility = "hidden";
  for (const glow of document.querySelectorAll("[data-exit-glow]")) {
    glow.style.visibility = "hidden";
  }
  return { overlay, copy };
}

export function useLeaveTo() {
  const router = useRouter();
  const leaving = useRef(false);

  // `direction` is the way the elements leave: -1 to the left (into a case
  // study), 1 to the right (back out of one). `from` marks a way back, and
  // names the project the projects screen should come back to.
  const leaveTo = useCallback(
    (href, { direction = -1, from } = {}) => {
      if (leaving.current) return;
      leaving.current = true;
      trip = from === undefined ? null : { from };
      // Coming back, the projects screen sets its own scroll.
      const go = () => router.push(href, { scroll: from === undefined });

      const scene = document.querySelector("[data-exit-scene]");
      if (reducedMotion() || !scene) {
        go();
        return;
      }

      router.prefetch(href);
      const { overlay, copy } = stage(scene);
      const leavers = movers(copy);

      // One distance for everything, so it all moves at one speed.
      const distance = direction * window.innerWidth;
      const moves = leavers.map((el, i) =>
        animate(
          el,
          { x: distance },
          { duration: DURATION, ease: EASE, delay: i * STAGGER },
        ),
      );

      setTimeout(go, LEAD * 1000);

      // Same duration for all, so the last to start is the last to finish.
      const last = moves[moves.length - 1];
      if (last) last.then(() => overlay.remove());
      else overlay.remove();
    },
    [router],
  );

  // For a link: a plain click plays the exit; a modified click (new tab,
  // download) is left to the browser.
  const onLinkClick = useCallback(
    (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      event.preventDefault();
      leaveTo(event.currentTarget.getAttribute("href"));
    },
    [leaveTo],
  );

  return { leaveTo, onLinkClick };
}

// The arrival back on the projects screen from a case study. Before the first
// paint, the page is scrolled to `target` — the projects section, not the
// landing above it — and its on-screen `data-exit` elements are set off to the
// left, then pulled in one at a time, top first. Returns whether this mount is
// a return, for the page to skip what only a first visit needs.
export function usePullIn(target) {
  // Read once, so a re-render mid-arrival doesn't lose it.
  const returning = useRef(trip !== null).current;

  useLayoutEffect(() => {
    if (!returning) return;
    trip = null;
    const section = target.current;
    if (!section) return;
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY);
    if (reducedMotion()) return;

    const unclipped = [...section.querySelectorAll("[data-exit-unclip]")];
    for (const box of unclipped) box.style.overflow = "visible";
    const distance = -window.innerWidth;
    const arrivers = movers(section);
    const arrivals = arrivers.map((el, i) => {
      // Off to the left from the first frame, not only once its turn comes.
      el.style.transform = `translateX(${distance}px)`;
      return animate(
        el,
        { x: [distance, 0] },
        { ...ARRIVE, delay: i * ARRIVE_STAGGER },
      );
    });
    const restore = () => {
      for (const box of unclipped) box.style.overflow = "";
    };
    const last = arrivals[arrivals.length - 1];
    if (last) last.then(restore);

    // Strict mode runs this twice in development; the second run starts over,
    // so everything goes back in place for it to find on screen.
    return () => {
      for (const arrival of arrivals) arrival.stop();
      for (const el of arrivers) el.style.transform = "";
      restore();
    };
  }, [returning, target]);

  return returning;
}
