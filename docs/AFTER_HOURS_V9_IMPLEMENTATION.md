# After Hours — `project blurbs v9` in code

Figma: `nG7iyk0gWfecnafCcVwutG`, node `1664:340` (page **AFTER HOURS**, frame
`project blurbs v9`, 1440 × 1024). Design history for v5–v8 is in
`AFTER_HOURS_FIGMA_WORKLIST.md`; this is the code that landed for v9.

v9 goes back to v7's two columns — blurbs left, time right — and drops v8's
single rail. What is new is that neither column is static: the blurb column is
a depth of field you scroll through, and the rail is a window that follows it.

## What shipped

`src/app/after-hours/components/`

| File | What it is |
|---|---|
| `ProjectBlurbs.js` | The section. Composes the 1440 × 1024 frame, owns the focus, takes the wheel. Replaces `PortfolioMenu` on `/after-hours`. |
| `ProjectBlurb.js` | One row of the blurb column, styled by its distance from the focus. |
| `TimelineTicker.js` | The right rail — axis, five stops, clock head. |
| `FlipClock.js` | `FLIP CLOCK – YYQX` and its `FLIP CARD`s, folding for real. |
| `frame.js` | `u()`, `box()`, `red()` — one design pixel, a node box, the one red. |

`src/app/assets/after-hours/blurb-bloom.svg` (`Ellipse 6`) and
`ticker-bloom.svg` (`Ellipse 7`) were exported from the frame. Neither is the
existing `blurred_elipse.svg`: both are `#CB0000` at 10% against that one's
30%, at different sizes.

Composed the same way `PortfolioLanding` is: a 1440 × 1024 stage scaled by
`--u` (container query units), so every number in the components is the Figma
number as-is. The rendered frame measures to the design to the pixel — rows at
y 68 / 259 / 450 / 683 / 874, heights 147 / 147 / 189 / 147 / 147, titles
33 / 33 / 52 / 33 / 33 px, blurs 4.8 / 2 / 0 / 2 / 4.8.

## The parts that are decisions, not measurements

**Depth of field is the only state.** Three steps out from the focus, from the
frame: full `#CB0000` 52 / 19 px with no blur, 46% at 33 / 14 with 2px, 20% at
33 / 14 with 4.8px. There is a fourth step at ±3 that rows enter and leave
through at zero opacity, so nothing pops in at the top or bottom of the column.
CSS transitions rather than framer-motion: the animated values are `calc()`
expressions on `--u`, which the browser interpolates and a JS tween cannot.

**The column wraps, the rail does not.** The frame shows five filled slots
around the focus, which with only three projects in the mock means Pavilion
appears twice — so the column is a loop with no visible ends. The rail is a
chronology and cannot loop, so its five-stop window clamps instead: at either
end of the timeline it stops sliding and the focused stop is no longer centred.

**The wheel is released at the ends.** Scrolling over the section moves the
focus, not the page, until the focus is at the first or last project; then the
wheel goes back to the page, so the footer stays reachable. `PortfolioMenu`
kept the wheel forever. Arrow keys, Home and End do the same thing from the
keyboard, and the section takes focus.

**What is clickable.** In focus, `CASE STUDY ↗` is the link to the project
page. Out of focus, the whole row is a button that brings it into focus. On the
rail, the focused project's stop links out — and is the only one that carries
the `↗`; another project stop inside the window moves the focus to it instead.

**The fold is a fold.** `FLIP CARD`'s four layers are built as the component
describes them: two static halves behind two leaves, the top leaf collapsing
onto the hinge as the bottom one unfolds off it, 0.35s, matching the
prototype's Smart Animate beat. Each leaf is a window onto a full-height face,
so the character runs unbroken across the hinge instead of being set twice. It
flips when the focused project's quarter changes, not on the mock's 2s timer.
`prefers-reduced-motion` cuts to the new value without folding.

## What this needed from `content/site.md`

Two additions, both parsed in `src/lib/content.js`, both failing the build if
they are wrong rather than rendering blank:

- **`Quarter: YYQX` per project.** It drives the clock and the `(Oct - Dec)`
  tag on the blurb — the tag is the quarter spelled out, so the two can never
  disagree. `Year:` is untouched and still feeds the old project page.
- **A `# Timeline` section.** One `##` per stop, oldest first. A stop with
  `Project: <name>` is that project's stop and must name a project exactly;
  everything else is a milestone. `Note:` is the second line.

The rail window is five stops centred on the focused project's stop, which is
what reproduces the frame exactly: around Dead Sweet Potato it reads *retired
from fencing · gap year begins · Dead Sweet Potato · florist @ The Metropolitan
Plant Center · EMT certification*.

`Hilltop Initiative` was renamed `Hilltop Microfinance Initiative`, which is
what the frame and the Figma worklist both call it. Project URLs are by
position, so nothing broke.

## Assumptions to shoot down

- **Every quarter is invented**, as in v7 and v8 — `content/site.md` carried
  only `Year: 24`. v9's ordering around Dead Sweet Potato is read off the
  frame, which puts the florist stop *after* the project; the worklist's v7
  table put it before. The frame won. The rest of the rail keeps the
  worklist's material: `EMT certification`, `culinary school, graduated` and
  `back on campus, YR3` came from the `# About` copy, and `Digital Canvas` and
  `Urban Collective` were given quarters so they have somewhere to sit.
- **Project copy was left alone.** The frame's bodies are two blocks of lorem
  separated by a blank line; the real descriptions are one paragraph each, so
  the blurbs render one paragraph. The component sets a blank line between
  paragraphs already — adding a second paragraph under any `### Description`
  gives the frame's shape without touching code.

## Known out-of-scope mismatch

`SharedBackground` lays a third ellipse (`blurred_elipse.svg`, 30% red, 70vw,
fixed to the top right) over the whole page, including this section. v9's frame
carries its own two blooms and not that one, so the section reads a little
redder than the frame does. It was left alone because it is the hero's
background too — removing or scoping it is a change to the landing.
