# AFTER HOURS — Figma worklist

Figma file: `nG7iyk0gWfecnafCcVwutG` (di4nekim)

## Done

### `NAVBAR – SITE` component — `1613:196`
Lives on page **deadsweetpotato, V0** at `(-729, -3460)`, next to the old
`NAVBAR – STANDARD` set. Built to match `src/app/components/Header.js` as it
actually ships:

- 1440 × 65, fill `#CB0000`, auto-layout, space-between, 30px left / 20px right
- `DIANE KIM` left, Inter Semi Bold 20px, `#F5EFE8`
- `RESUME` / `GITHUB` / `LINKEDIN` right, same type
- each link carries the 5px beige bar at its left edge — that's the resting
  state of the hover fill that sweeps across on hover

### `FLIP CARD` variant set — `1615:201`
Page **deadsweetpotato, V0** at `(800, -4300)`. Fliqlo-style card, 60 × 80,
6px radius. Flat `#9C0D0F` leaves (the alternate `--main-red` already commented
out in `globals.css`) over a darker `#5A0809` body, so the hinge reads as a line
with no bevel. Inter Bold 54px beige digit.

- Variants: `State=Rest`, `State=Flipped`
- Text properties: `Current` (`Current#1615:0`), `Next` (`Next#1615:3`)
- Four layers: `half / top (next)` and `half / bottom (current)` sit behind the
  two flaps. `flap / top (current)` collapses onto the hinge while
  `flap / bottom (next)` unfolds — Smart Animate interpolates both, which is
  what reads as a fold.
- Prototype: `AFTER_TIMEOUT` 2s → Smart Animate 0.35s ease-in-out, both
  directions, so it loops.

### `FLIP CLOCK – YYQX` component — `1615:241`
Page **deadsweetpotato, V0** at `(800, -3960)`. 258 × 80, four `FLIP CARD`
instances, 6px gaps. Set each card's `Current` / `Next` to change the value.

### `project blurbs v5` — `1620:24`
Page **AFTER HOURS** at `(1600, 0)`, cloned from `project blurbs v4`
(`1602:79`).

- Header swapped to `NAVBAR – SITE`, resized 125 → 65
- Blurbs tightened. Was `(-177, 192)` / `(308, 463)` / `(677, 737)` —
  steps of +485/+271 and +369/+274. Now `(-177, 192)` / `(143, 382)` /
  `(463, 572)` — an even +320/+190 step
- `Group 34` ("click to see the full visual story") removed, flip clock
  instance at `(120, 800)` in its place
- `Rectangle 15` (the soft backdrop) moved to `(96, 780)` and widened to
  408 × 152 so it still sits behind the clock

### `project blurbs v7` — `1644:190`

Page **AFTER HOURS** at `(4733, 0)`, built from `project blurbs v6` (`1636:134`).
v6's diagonal cascade is gone; the layout is now two columns — blurbs left,
time right.

**Blurbs, vertical and left justified.** One 96px gutter for all three. Each
blurb is a horizontal auto-layout row: title `310` / rule `6` / body `490`,
40px gaps, so every body shares a left edge at `492` and ends at `982`. The
rows sit in a vertical auto-layout column at `(96, 140)`, 68px apart, hugging
to `928`. The inline `('24)` tags were removed from the blurbs — the rail
carries time now.

Depth of field is unchanged from v6: the focus blurb is 62.4px italic title /
26px body at full `#CB0000`; the out-of-focus ones are 48px / 20px at 30% with
a 4px layer blur on the row. The rule is a rectangle filling the row height
rather than v6's `-90.69°` rotated LINE, which was an artifact.

**`TIMELINE TICKER` — `1646:204`.** The right rail at `(1012, 150)`, 388 wide.
One 2px axis at 30% running `195 → 905`, into the clock. Nine stops, oldest at
the top. Each stop is a horizontal auto-layout: quarter code right-aligned in a
96px column, then a 28px tick slot whose centre *is* the axis, then the label.

| Quarter | Stop | Kind |
|---|---|---|
| 24Q1 | Hilltop Microfinance Initiative | project |
| 24Q2 | retired from fencing — T64 in D1 Women's Epee | milestone |
| 24Q2 | gap year begins | milestone |
| 24Q3 | florist @ The Metropolitan Plant Center — 2 months | milestone |
| 24Q4 | Dead Sweet Potato | project |
| 25Q1 | EMT certification | milestone |
| 25Q2 | culinary school, graduated | milestone |
| 25Q3 | back on campus, YR3 | milestone |
| 25Q4 | Pavilion | project |

Six of the nine stops carry **no blurb** — that was the point of v7. Project
stops get a 26 × 3 tick at full opacity, 17px quarter, 18px label; milestones
get 14 × 2 at 50%, 15px quarter at 45%, 15px label at 60%, with the secondary
clause as a 13px subline at 40%. The three project stops are pinned to their
blurb's vertical centre — `227` / `537` / `844` — so the rail reads as the
index of the left column.

Ticker labels are Inter Medium, upright. The blurbs stay italic. That contrast
is what separates the index from the content; no copy needed.

**Clock moved.** `FLIP CLOCK – YYQX` is now the head of the rail at
`(1154, 898)` with its blurred backdrop, not a bottom-left corner piece. Set to
read `25Q4 → 26Q1` so the head agrees with the last stop. `FENCING / YR1, YR2 /
GAP YEAR / SUMMER26 / YR3 / YR4` from v6 is dropped — the ticker says it
explicitly.

`Ellipse 6` was re-centred to `(15, 88)` so the bloom haloes the focus blurb
instead of the empty upper right.

**Assumed, not given:** every quarter in the table above. `content/site.md`
carries only `Year: 24` per project and nothing for the non-project milestones,
so the dates are a plausible reading of the gap year (May '24 – Aug '25) from
`# Experience`, not fact. `EMT certification`, `culinary school, graduated` and
`back on campus, YR3` were drawn from the `# About` copy to fill the rail —
say the word and they come out.

### `project blurbs v8` — `1654:240`

Page **AFTER HOURS** at `(6273, 0)`. The two-column split of v7 collapses: there
is one timeline, it is on the left, and the blurbs are no longer beside it —
they **are** stops on it.

**Two tiers, and the tier is the hierarchy.** v5–v7 used a depth-of-field blur
to say "look here." v8 drops it entirely. What separates a stop now is whether
it has somewhere to go.

| | Significant (has a dedicated page) | Deprecated (no page) |
|---|---|---|
| Axis node | 13px filled dot inside a 25px ring @ 35% | 14 × 2 dash @ 45% |
| Quarter | Inter Medium 17, full `#CB0000` | Inter Medium 15 @ 40% |
| Body of the stop | the original blurb — 44px italic title right-aligned against a 6px rule, 20px italic body | one 15px label @ 50%, optional 13px subline @ 35% |
| Affordance | `CASE STUDY ↗` eyebrow, Inter Medium 12 @ 55%, letterspaced | none |
| Hit area | tinted plate, `#CB0000` @ 5%, 4px radius, 18/24 padding — the whole row | none |

The plate is doing the real work: it gives the row an edge, so it reads as a
target rather than as text that happens to be darker. The first pass used a 5px
accent bar instead (the `Header.js` hover-bar motif) and it failed — at 5px next
to a 6px rule it read as a second rule, not as a control.

Titles are right-aligned against the rule, as in v6. Left-aligning them (as v7
does, where they anchor a column) leaves a ragged gap between the short ones and
the rule once they sit inside a plate.

**Geometry.** Stop = horizontal auto-layout at `x=60`: quarter `88` right-aligned
→ node slot `28` (its centre *is* the axis at `x=161`) → content FILL. Project
text starts at `200`; milestone content carries `paddingLeft 45` so its labels
land on the same `221` as the project titles. The rail is a vertical auto-layout
at `(60, 130)`, spacing solved to land the last stop by `900`. The axis runs
`150 → 940`, into the clock.

Eight stops: `24Q1` Hilltop · `24Q2` retired from fencing (T64 in D1 Women's
Epee) · `24Q2` gap year begins · `24Q3` florist @ The Metropolitan Plant Center
(2 months) · `24Q4` Dead Sweet Potato · `25Q1` EMT certification · `25Q2`
culinary school, graduated · `25Q4` Pavilion. Five of the eight have no blurb.

`FLIP CLOCK – YYQX` sits at the foot of the rail, centred on the axis at
`(72, 930)`, reading `25Q4 → 26Q1`.

**Same assumption as v7:** every quarter above is inferred, and `EMT
certification` / `culinary school, graduated` were drawn from the `# About` copy
to populate the deprecated tier. Nothing in `content/site.md` supplies them.

**What v8 needs from the content model that v7 did not:** a per-project flag for
whether a case-study page exists. The tier split is the whole design, and right
now it is hardcoded in the frame. Something like `Page: yes` under each `##`
project in `content/site.md`, plus a top-level list of page-less milestones.

### Recolored to the live `/portfolio` palette
Read off the running dev server, not guessed. Every existing paint opacity was
preserved and only the hue swapped, so the blur-4 / 30% depth-of-field on the
out-of-focus blurbs survives.

| Element | Was | Now |
|---|---|---|
| Frame background | white | `#F5EFE8` — `SharedBackground` |
| `Ellipse 6` | grey @ 50%, blur 148 | `#CB0000` @ 30% — `blurred_elipse.svg` |
| `Rectangle 15` | grey, blur 85 | `#CB0000` @ 15% — `click_to_see.svg` |
| Titles, years, rules, body | black @ 100% / 30% | `#CB0000` at the same opacities |
| `FLIP CARD` | `#0E0E0E`, 84 × 112, two-tone leaves | flat `#9C0D0F` on `#5A0809`, 60 × 80 |
| `FLIP CARD` digits | `#F5EFE8` | unchanged |
| `FENCING` annotation | black | left black on purpose — it reads as a note, not copy |

The `FLIP CARD` recolor was applied to the component set, so every instance of
the clock anywhere in the file follows.

### All nav headers swapped — 39 instances, 0 failures

| Page | Swapped |
|---|---|
| AFTER HOURS (`1602:68`) | 2 |
| v2 personal portfolio (`1549:373`) | 6 |
| v1 simplified (`1219:93`) | 16 |
| deadsweetpotato V0 (`0:1`) | 15 |

`portfolio case studies` (`1519:332`) has no top navs. Each instance was swapped
to `1613:196`, resized 1440 × 65, and kept at its original x/y.

## Remaining

Two nodes are *not* instances and so could not be swapped:

- `29:126` — the `NAVBAR – STANDARD/Variant4` **main component** sits inside frame
  `portfolio – work in progress` (`3:12`) on the V0 page and acts as that frame's
  nav, so that one frame still shows the old header.
- `6:51` — the `NAVBAR – STANDARD` component set itself.

Both are the old library sources. Leaving them keeps the exploration history
readable; the alternative is moving them out to a components strip and dropping a
`NAVBAR – SITE` instance into `3:12`. Not done unprompted — say the word.

`PAGE NAV` (`20:75`) is the vertical side rail, not a top header — left alone.

**Open assumption:** the clock reads `24Q4` flipping to `24Q2` in v5/v6, and
`25Q4 → 26Q1` in v7 (where it heads the ticker), because `content/site.md` only
carries `Year: 24` per project — there is no quarter in the content model yet.
Every quarter on v7's ticker inherits this assumption. See the data-model note
below.

## Chronology vs. ongoing — data model

Bounded work (EMT cert, culinary school) and ongoing practice (writing,
dancing, reading) need one list, two shapes. Suggested fields per item in
`content/site.md`:

```
Start: 24Q3
End: 25Q1      # or "ongoing"
```

Bounded items are segments on the time axis and flip with the clock. Ongoing
items are open-ended rails that start at their first quarter and run off the
right edge — they never flip. The contrast between flipping and static is what
carries the meaning, no copy required.

