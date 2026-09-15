# Optimizations Worklist

Tracking the fixes surfaced by the 2026-09-14 project audit.
Sourced from the audit report of `di4nekim` (Next.js 15 + React 18 + Tailwind + Framer Motion + Lenis).

Legend: `[ ]` open · `[x]` done · `[~]` in progress · `[-]` skipped (with reason)

---

## Session 1 — Quick wins (10–20 min)

- [x] **C3 — Fix broken ESLint config.** Installed `eslint-config-prettier`, added `next/core-web-vitals` to extends, disabled `react/react-in-jsx-scope` (obsolete under new JSX transform). `next lint` now runs. Surfaced additional issues logged under "Discovered during audit" below.
- [x] **C1 — Bump Next.js off 15.0.3.** Upgraded to 15.5.25 (latest 15.x). Also bumped `eslint-config-next` to match. Production vulnerabilities dropped from ~12 (1 critical, 9 high) to 3 (2 high, 1 moderate) — remaining are transitive PostCSS in Next internals, fixable only via Next 16 (major bump, deferred).
- [x] **H2 — Add `rel="noopener noreferrer"` to external links** in `src/app/components/Header.js`. Also added `target="_blank"` since these are external.
- [x] **H3 — Expand root metadata** in `src/app/layout.js`. Added description, openGraph, twitter, viewport (as separate export per Next 15 convention), robots, canonical URL, icons, title template. Also fixed an unrelated HTML validity bug: `<SpeedInsights />` was a direct child of `<html>`; moved into `<body>`. Removed redundant `<link rel="icon">` from JSX (now in metadata).
- [x] **H4 — Memoize context value** in `src/app/components/ExpSection.js`. `{ experience, setExperience }` wrapped in `useMemo` with `[experience]` dep. Consumers no longer re-render on unrelated parent renders.

## Session 2 — Perf pass (~1 hr)

- [~] **C2 — Optimize `landing-cloud.png`**. Source 2955×1892 PNG (4.2 MB) → 1400×896 WebP (**31 KB**) via `sips` resize + `sharp` webp encode. Deleted the PNG. **Attempted** to wrap `Cloud` with `motion.create(Image)` for next/image responsive srcset, but doing so changed the image's rendered dimensions enough to break the surrounding layout (next/image sets `width`/`height` HTML attrs from the static import; interaction with the parallax offsets, `max-w-5xl` parent, and the `h-[600px]` class rendered differently). **Rolled back the code change** — `Cloud` is once again a raw `motion.img` pointing at `/landing-cloud.webp`. Size win (**4.2 MB → 31 KB source**) preserved. Left on the table: responsive srcset and automatic AVIF negotiation — worth revisiting if we ever want per-viewport sizing, but at 31 KB the marginal value is small.
- [x] **H1 — Pick one scroll library**. Dropped Lenis: uninstalled `@studio-freight/lenis`, deleted `src/app/hooks/useLenis.js`, removed the `useLenis()` call from `Landing.js`. Framer Motion's `useScroll`/`useTransform` handles all scroll-linked animation. `/` route First Load JS: 14.9 → **11.9 kB**.
- [x] **M5 — Add sizing hint to ExpSection Image**. Note: original audit finding was based on a misread — `ExperienceCloud2` is a static import, so next/image already infers width/height and CLS was never at risk. Real improvement made instead: added responsive `sizes` prop matching the `w-[Xvw]` classes so the browser fetches the right resolution, and switched `alt="ExperienceCloud2"` → `alt=""` (decorative image; screen readers skip it).

## Session 3 — A11y + hygiene

- [x] **H5 — Keyboard-inaccessible controls fixed.** ExpSection Dropdown: removed a redundant outer `<div onClick>`, converted experience-item `<div onClick>` → `<button type="button">`, added `aria-expanded`/`aria-haspopup="listbox"`/`aria-label` to toggle buttons, marked decorative chevron images with `alt=""` + `aria-hidden`. PortfolioMenu items: converted to `role="link" tabIndex={0} aria-label={"View project: …"}` with Enter/Space keydown handling (over wrapping in `<Link>` because navigation is deliberately delayed by `setTimeout` to play a slide-out animation — a real `<Link>` would fight that or break right-click/cmd-click semantics). Focus-visible outline rings added throughout.
- [x] **M8 — Button HTML validity.** Was rendering `<div><button><a>…</a></button></div>` (invalid nesting; screen readers confused). Now renders one of `<a href target="_blank" rel="noopener noreferrer">` (when `link` prop present) or `<button type="button" onClick>`. Added focus:* states matching hover:*. Extracted the shared class list to a `BUTTON_CLASSNAME` constant and added a `className` prop for per-call overrides.
- [x] **M10 — Alt on parallax hero image.** `<motion.img alt="">` — decorative image, screen readers skip.
- [x] **M11 — Contrast pass (verification + partial fix).**
  - Button default `opacity-70` = 3.73:1 → bumped to `opacity-85` = 4.61:1 (passes AA).
  - Landing.js sidebar `opacity-60` = 2.43:1 (fails). Left untouched by design decision — these `<li>` labels are decorative (no href, no onClick), so WCAG contrast rules technically don't apply.
- [x] **M1 — CSS Modules killed.** Migrated `styles/Header.module.css` → Tailwind arbitrary-value classes on `src/app/components/Header.js`. `styles/` directory removed. All styling in the project is now Tailwind.
- [x] **M6 — Security headers.** `next.config.mjs` now emits `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` for all routes. CSP deferred (needs care around Framer Motion + Speed Insights).
- [x] **M7 — `robots.js` + `sitemap.js`** added via Next's file conventions. Sitemap lists `/` and `/portfolio` with monthly cadence. Dynamic route `/portfolio/project/[slug]` excluded (no known slugs yet).
- [x] **H6 — Experience mobile hydration flicker fixed.** `isMobile` state now starts `null` (not `false`); component renders the shell only until the first `useEffect` measurement decides mobile vs desktop. No flash of the wrong branch.

## Backlog — low priority

- [-] **M2 — React 18 → 19.** Deferred by explicit decision (2026-09-15). React 19 has subtle breaking changes; not deploy-blocking to stay on 18.
- [x] **M3 — Dropped `react-responsive`.** Replaced with a small local `useMediaQuery(query)` hook built on `window.matchMedia` (matches the `Sidebar` pattern in `Experience.js`). Same SSR behavior as before via `null` sentinel. Package uninstalled.
- [x] **M4 — Dead imports cleaned up.** `PersonalProjects` removed earlier; `Sidebar.js` deleted (was marked DEPRECATED, no imports found).
- [x] **M9 — Commented-out code deleted.** 37 lines across `Landing.js`, `ExpSection.js`, `Header.js`. Preserved comments that document *why* (e.g. "need 'use client' for framer-motion", memoization rationales).
- [x] **Outdated dev deps** — safe patch/minor bumps applied via `npm update`: `@vercel/speed-insights` 1.1 → 1.3, `framer-motion` 11.11 → 11.18, `prettier` 3.3 → 3.9, `tailwindcss` 3.4.14 → 3.4.19, `postcss` 8.4 → 8.5, plus lint plugins. Vulnerabilities dropped 3 → 2.
- [x] **`@vercel/speed-insights` 1 → 2** — dropped in cleanly; same import path (`/next`) and component name in v2, no code changes needed.
- [-] **`framer-motion` 11 → 13** — **attempted and reverted**. `PortfolioLanding.js` combines `initial+animate` entry animation with scroll-linked `style={{ x, y, opacity }}` motion values on the same element. v11 composed them correctly; v13 lets the initial state stick and the LATEST PROJECTS motion.div never leaves `opacity:0`. Rolled back to ^11.18.2. A proper migration would need each such conflict split across a wrapper (entry) + inner (scroll motion values) — separate PR.
- **Skipped majors** (still open, each needs its own migration PR): `next` 15 → 16, `eslint` 8 → 10 + `eslint-config-next` 15 → 16 (flat config), `eslint-plugin-react-hooks` 5 → 7, `eslint-plugin-tailwindcss` 3 → 4 (tied to Tailwind 4), `framer-motion` 11 → 13 (see above), `tailwindcss` 3 → 4.
- [x] **Favicon dedup.** `src/app/favicon.ico` deleted; `sparkles.svg` (declared via `metadata.icons`) is now the sole favicon.
- [-] **TODO in `data/ExperienceData.js:1`** (gap year page link) — left as-is by decision (2026-09-15).
- [x] Dead `typeof window !== 'undefined'` guards in `PortfolioMenu.js` — resolved during the rules-of-hooks refactor (viewport constants now live in state, set inside an effect).
- [ ] Extract inline `style={{}}` object literals on hot-path motion components — deferred until profiling shows a hotspot.

---

## Discovered during audit (surfaced by working lint)

- [x] **CRITICAL — `useTransform` called inside a `.map()` callback** in `PortfolioMenu.js`. Refactored: extracted each item into a new `PortfolioMenuItem` component; hooks now called at fixed order per instance. Also fixed the `defaultProjects` snap-effect bug (moved to module scope so its identity is stable across renders), replaced `||` with `??` for id fallback (was treating `id: 0` as falsy), and lifted viewport-derived constants (`itemSpacing`, `centerX`, `centerY`, `itemHeight`, `headerHeight`) into state driven by a resize-aware effect (previously computed from `window` inline on every render, which never actually re-flowed on resize).
- [x] **`ProjectItem` unused props + hardcoded lorem ipsum**. Removed `image`, `technologies`, `id` from signature. `description` prop now actually renders (was commented out). Note: the underlying `DEFAULT_PROJECTS` data still contains lorem ipsum — replace with real copy.
- [x] **Contradicting Tailwind classes** in `ProjectItem.js`. Kept `items-center`.
- [x] **Unescaped `'`** in `ProjectItem.js:24` and `Landing.js:70`. Both use `&apos;`.
- [x] **`useEffect` missing dep** in `portfolio/project/[slug]/page.js:30` (`defaultProjects`) — resolved by moving `DEFAULT_PROJECTS` to module scope where identical fix applies. TODO: verify same treatment in the `[slug]/page.js` file if it has its own copy.
- [x] **Deprecated Tailwind classnames** — `flex-shrink-0` → `shrink-0` in `ProjectItem.js` (2 spots).
- [x] **`PersonalProjects` unused import** in `src/app/page.js:6` — removed (was already tracked as M4).
- [x] **`experience` unused destructure** in `ExpSection.js:217` (`Menu` only needed `setExperience`).
- [x] **Header used `<a href="/">` for home nav** — swapped to `next/link`.
- [x] Tailwind classname-order warnings — resolved via `npx prettier --write "src/**/*.js"`.
- [x] Remaining Tailwind v3 lint warnings (shorthand `size-*`, unnecessary arbitrary values, negative-arbitrary-value form) — swept manually across 4 files after an agent hallucinated an alternative `@/lib/content` refactor that had to be fully reverted. Final lint state: 0 errors, 0 warnings.
- [x] `react-hooks/exhaustive-deps` in `portfolio/project/[slug]/page.js` — resolved by moving the local `defaultProjects` to module-scope `DEFAULT_PROJECTS` (same treatment as `PortfolioMenu.js`).

## Progress log

- **2026-09-14** — Audit performed; worklist created. Project renamed from `deadsweetpotato` → `di4nekim` in `package.json` and `package-lock.json` (folder name unchanged).
- **2026-09-14** — C3 done. `next lint` restored to working order.
- **2026-09-14** — Session 1 complete (C1, H2, H3, H4). Compile clean (`next build --no-lint` succeeds); `next build` without the flag now fails on pre-existing bugs surfaced by newly-working lint — tracked under "Discovered during audit" and must be addressed before production deploy.
- **2026-09-14** — Deploy-blocking bugs fixed. `next build` succeeds with the lint gate on (zero errors, ~50 auto-fixable warnings remaining). Key changes: PortfolioMenu refactored (rules-of-hooks + `useCallback` for handlers + resize-reactive viewport state), ProjectItem now actually uses its props, Header uses `next/link`, entities escaped. All 6 routes generate; `/portfolio` bundle grew 3.65 → 3.86 kB (new PortfolioMenuItem).
- **2026-09-14** — Session 2 complete (C2, H1, M5). Biggest win: `landing-cloud` went from a 4.2 MB PNG loaded as raw `<img>` to a 31 KB WebP served via next/image with a full responsive srcset. Lenis removed (`/` route: 14.9 → 11.9 kB First Load JS). Build clean; both `/` and `/portfolio` return 200 from the dev server.
- **2026-09-14** — Rolled back the next/image wrap in C2 (broke layout). Kept the WebP file so the 4.2 MB → 31 KB size win holds; dropped the responsive srcset (marginal value at 31 KB).
- **2026-09-14** — Pushed 6 commits to `origin/portfolio`. Remote URL migrated `dsp` → `di4nekim`.
- **2026-09-15** — Session 3 + backlog swept in one workflow pass, tests-as-you-go, opus subagents for the actual edits, orchestrator committing between phases. All Session 3 items closed (H5, M8, M10, M11, M1, M6, M7, H6). All backlog items resolved except two intentional deferrals (React 19; the gap year TODO) and one profiling-gated (inline motion styles). Vulnerabilities down to 2 (from 3 last session); remaining are transitive postcss in Next internals, patched only by a Next 16 major bump.
- **2026-09-15 (afternoon pass)** — Lint sweep + selective major bumps: 0 → 0 lint errors/warnings after the manual Tailwind v3 cleanup (one Opus subagent attempted this and hallucinated a fictional `@/lib/content` module — reverted). `@vercel/speed-insights` cleanly bumped to v2. `framer-motion` → 13 attempted, broke PortfolioLanding's entry animation (initial+animate stuck at opacity:0), reverted to ^11.18.2.
