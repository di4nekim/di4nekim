// One design pixel of a Figma frame, scaled by the `--u` the section sets, so
// every number in these components can stay the Figma number as-is. Same unit
// PortfolioLanding composes on.
export const u = (n) => `calc(var(--u) * ${n})`;

export const box = (left, top, width, height) => ({
  left: u(left),
  top: u(top),
  width: width === undefined ? undefined : u(width),
  height: height === undefined ? undefined : u(height),
});

// The one red, at whatever opacity the design asks for.
export const red = (alpha) => `rgba(203, 0, 0, ${alpha})`;

// Shared easing for the depth-of-field moves. Matches DiagonalReveal's EASE.
export const SETTLE =
  "duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
