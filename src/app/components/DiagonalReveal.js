"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Fades every <Reveal> inside a <DiagonalReveal> in on a staggered cadence
// along the 45° top-left → bottom-right axis. Each element's rank is its
// centre's projection onto that axis (x + y), measured after layout, so the
// order follows the page as it actually renders at any viewport size.
//
// Adapted from the original /portfolio landing: elements slide in from
// (-200, -200) over 1.5s, and page scroll carries them back out the way they
// came. The scroll exit is the entrance in reverse — last in, first out — and
// is scrubbed, so scrolling back to the top brings everything back in.

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const RevealContext = createContext(null);

const EASE = [0.22, 1, 0.36, 1];

export function DiagonalReveal({
  children,
  step = 0.11,
  duration = 1.5,
  distance = 200,
  // Fraction of the viewport height scrolled by the time every element is out.
  exitSpan = 0.8,
}) {
  const nodes = useRef({});
  const [ranks, setRanks] = useState(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Children register in their own layout effects, which run before this one.
  useIsomorphicLayoutEffect(() => {
    const ranked = Object.entries(nodes.current)
      .map(([id, el]) => {
        const r = el.getBoundingClientRect();
        return [id, r.left + r.width / 2 + (r.top + r.height / 2)];
      })
      .sort((a, b) => a[1] - b[1]);
    setRanks(Object.fromEntries(ranked.map(([id], i) => [id, i])));
  }, []);

  const value = {
    nodes,
    ranks,
    count: ranks ? Object.keys(ranks).length : 0,
    step,
    duration,
    exitSpan,
    scrollY,
    distance: reduceMotion ? 0 : distance,
  };

  return (
    <RevealContext.Provider value={value}>{children}</RevealContext.Provider>
  );
}

// exitOnScroll={false} keeps an element in place once it has entered — for
// things that outlive the landing, like the fixed header.
export function Reveal({
  as = "div",
  exitOnScroll = true,
  children,
  ...props
}) {
  const ctx = useContext(RevealContext);
  const id = useId();
  const ref = useRef(null);
  const rank = ctx?.ranks?.[id];

  // enter: 0 → 1 as the element arrives. exit: 0 → 1 as scroll carries it out.
  const enter = useMotionValue(0);
  const exit = useTransform(ctx?.scrollY ?? enter, (y) => {
    if (!ctx || !exitOnScroll || rank === undefined) return 0;
    // Reverse rank: the last element in is the first one out.
    const slot = (ctx.count - 1 - rank) / ctx.count;
    const span = window.innerHeight * ctx.exitSpan;
    const start = slot * span * 0.5;
    const end = start + span * 0.5;
    return Math.min(1, Math.max(0, (y - start) / (end - start)));
  });
  const offset = useTransform(
    [enter, exit],
    ([e, s]) => -(ctx?.distance ?? 0) * (1 - e + s),
  );
  const opacity = useTransform([enter, exit], ([e, s]) => e * (1 - s));

  useIsomorphicLayoutEffect(() => {
    if (!ctx) return;
    const nodes = ctx.nodes.current;
    nodes[id] = ref.current;
    return () => delete nodes[id];
  }, [ctx, id]);

  const duration = ctx?.duration;
  const step = ctx?.step;
  useEffect(() => {
    if (rank === undefined) return;
    const controls = animate(enter, 1, {
      duration,
      delay: rank * step,
      ease: EASE,
    });
    return () => controls.stop();
  }, [rank, enter, duration, step]);

  // Outside a DiagonalReveal (e.g. Header on the homepage) render as-is.
  if (!ctx) {
    const Tag = as;
    return <Tag {...props}>{children}</Tag>;
  }

  const Tag = motion[as];

  return (
    <Tag
      ref={ref}
      {...props}
      style={{ ...props.style, x: offset, y: offset, opacity }}
    >
      {children}
    </Tag>
  );
}
