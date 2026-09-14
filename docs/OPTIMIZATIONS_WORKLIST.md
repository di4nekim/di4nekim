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

- [x] **C2 — Optimize `landing-cloud.png`**. Source 2955×1892 PNG (4.2 MB) → 1400×896 WebP (**31 KB**) via `sips` resize + `sharp` webp encode. Deleted the PNG (WebP is universally supported). Rewrote the `Cloud` component in `Landing.js`: `motion.img` → `motion.create(Image)` with static import so next/image applies. Browser now gets a responsive srcset (640/750/828/1080/1200/1920/2048/3840 widths at q=75) served via `/_next/image` — the largest asset in the whole site went from **4.2 MB → ~31 KB** at typical resolutions.
- [x] **H1 — Pick one scroll library**. Dropped Lenis: uninstalled `@studio-freight/lenis`, deleted `src/app/hooks/useLenis.js`, removed the `useLenis()` call from `Landing.js`. Framer Motion's `useScroll`/`useTransform` handles all scroll-linked animation. `/` route First Load JS: 14.9 → **11.9 kB**.
- [x] **M5 — Add sizing hint to ExpSection Image**. Note: original audit finding was based on a misread — `ExperienceCloud2` is a static import, so next/image already infers width/height and CLS was never at risk. Real improvement made instead: added responsive `sizes` prop matching the `w-[Xvw]` classes so the browser fetches the right resolution, and switched `alt="ExperienceCloud2"` → `alt=""` (decorative image; screen readers skip it).

## Session 3 — A11y + hygiene (when there's time)

- [ ] **H5 — Fix keyboard-inaccessible controls.** `<div>` with `onClick` used as buttons in `ExpSection.js` (~L280 Dropdown, menu items) and `portfolio/components/PortfolioMenu.js:106-195`. Convert to `<button>` or add `role="button"` + `tabindex="0"` + keydown handlers.
- [ ] **M8 — Refactor `Button` component.** `src/app/components/Button.js:6-14` renders a `<button>` wrapping an `<a>` — invalid HTML. Render one or the other based on the `link` prop.
- [ ] **M10 — Add `alt` on the parallax hero image** in `src/app/components/Landing.js:113`. If decorative, use `alt=""` explicitly.
- [ ] **M11 — Contrast pass.** Verify `opacity-60` sidebar links (`Landing.js:41-44`) and `opacity-70` Button default state pass WCAG AA 4.5:1. Use Lighthouse or axe.
- [ ] **M1 — Kill CSS Modules.** Migrate `styles/Header.module.css` into Tailwind classes in `src/app/components/Header.js`, then delete the module file. Consolidates styling paradigm.
- [ ] **M6 — Add security headers** in `next.config.mjs`: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`. Consider a CSP.
- [ ] **M7 — Add `robots.txt` and `sitemap.xml`** via Next's file conventions (`src/app/robots.js`, `src/app/sitemap.js`).
- [ ] **H6 — Fix Experience mobile hydration flicker** in `src/app/components/Experience.js:~70`. `isMobile` initialized to `false` then flipped in `useEffect`; mobile viewers see desktop layout for a beat.

## Backlog — low priority

- [ ] **M2 — React 18 → 19** (Next 15 supports it; not urgent).
- [ ] **M3 — Drop `react-responsive`.** Used only in `ExpSection.js`; replace with the `window.matchMedia` pattern already used in `Experience.js`.
- [~] **M4 — Clean up dead imports.** `PersonalProjects` import removed. `src/app/components/Sidebar.js` still exists — delete when confident nothing imports it.
- [ ] **M9 — Delete commented-out code blocks** in `Landing.js` (74–80, 122–125), `ExpSection.js` (46, 239–261), `Header.js` (3–4). Git history is the archive.
- [ ] Outdated dev deps: `eslint` (8→10), `eslint-config-next` (15→16), `framer-motion` (11→13), `@vercel/speed-insights` (1.1→2.x).
- [ ] Favicon set twice — `<link rel="icon" href="/sparkles.svg">` in `layout.js:19` AND `src/app/favicon.ico`. Pick one.
- [ ] Resolve TODO in `src/app/data/ExperienceData.js:1` (gap year page link).
- [x] Dead `typeof window !== 'undefined'` guards in `PortfolioMenu.js` — resolved as part of the rules-of-hooks refactor (viewport constants now live in state, set inside an effect).
- [ ] Extract inline `style={{}}` object literals on hot-path motion components (`ExpSection.js:143-151`, `185-191`) — only if profiling shows a hotspot.

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
- [ ] Tailwind classname-order warnings scattered throughout — auto-fixable via `prettier --write` (prettier-plugin-tailwindcss is already installed). Not deploy-blocking.
- [ ] Same for the `[slug]/page.js` warnings.

## Progress log

- **2026-09-14** — Audit performed; worklist created. Project renamed from `deadsweetpotato` → `di4nekim` in `package.json` and `package-lock.json` (folder name unchanged).
- **2026-09-14** — C3 done. `next lint` restored to working order.
- **2026-09-14** — Session 1 complete (C1, H2, H3, H4). Compile clean (`next build --no-lint` succeeds); `next build` without the flag now fails on pre-existing bugs surfaced by newly-working lint — tracked under "Discovered during audit" and must be addressed before production deploy.
- **2026-09-14** — Deploy-blocking bugs fixed. `next build` succeeds with the lint gate on (zero errors, ~50 auto-fixable warnings remaining). Key changes: PortfolioMenu refactored (rules-of-hooks + `useCallback` for handlers + resize-reactive viewport state), ProjectItem now actually uses its props, Header uses `next/link`, entities escaped. All 6 routes generate; `/portfolio` bundle grew 3.65 → 3.86 kB (new PortfolioMenuItem).
- **2026-09-14** — Session 2 complete (C2, H1, M5). Biggest win: `landing-cloud` went from a 4.2 MB PNG loaded as raw `<img>` to a 31 KB WebP served via next/image with a full responsive srcset. Lenis removed (`/` route: 14.9 → 11.9 kB First Load JS). Build clean; both `/` and `/portfolio` return 200 from the dev server.
