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

- [ ] **C2 — Optimize `landing-cloud.png`.** File is 4.2 MB, displayed at ~600px height from a 2955px source, loaded as raw `<motion.img>`. See `public/landing-cloud.png` and `src/app/components/Landing.js:113`. Two-part fix:
  1. Resize the source PNG to ~1400px wide, export WebP.
  2. Wrap with `next/image` (via `motion(Image)`) so it gets format negotiation, lazy loading, and dimension attributes.
- [ ] **H1 — Pick one scroll library.** Both Lenis (`src/app/hooks/useLenis.js`) and Framer Motion's `useScroll`/`useTransform` are running. Recommendation: drop Lenis, keep Framer. Removes ~248 KB from bundle and eliminates dual scroll listeners.
- [ ] **M5 — Add `width`/`height` to `<Image>`s** in `src/app/components/ExpSection.js:222` (`ExperienceCloud2`). Prevents CLS. `PortfolioLanding.js:25` already does this — copy the pattern.

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
- [ ] **M4 — Clean up dead imports.** `PersonalProjects` in `src/app/page.js:6` (only referenced in a comment). `src/app/components/Sidebar.js` marked "DEPRECATED" — delete.
- [ ] **M9 — Delete commented-out code blocks** in `Landing.js` (74–80, 122–125), `ExpSection.js` (46, 239–261), `Header.js` (3–4). Git history is the archive.
- [ ] Outdated dev deps: `eslint` (8→10), `eslint-config-next` (15→16), `framer-motion` (11→13), `@vercel/speed-insights` (1.1→2.x).
- [ ] Favicon set twice — `<link rel="icon" href="/sparkles.svg">` in `layout.js:19` AND `src/app/favicon.ico`. Pick one.
- [ ] Resolve TODO in `src/app/data/ExperienceData.js:1` (gap year page link).
- [ ] Dead `typeof window !== 'undefined'` guards in `portfolio/components/PortfolioMenu.js:37-39` (component is `'use client'`; window is always defined).
- [ ] Extract inline `style={{}}` object literals on hot-path motion components (`ExpSection.js:143-151`, `185-191`) — only if profiling shows a hotspot.

---

## Discovered during audit (surfaced by working lint)

- [ ] **CRITICAL — `useTransform` called inside a `.map()` callback** in `src/app/portfolio/components/PortfolioMenu.js` (lines 118, 126, 135, 141, 147, 154, 161, 176). Violates React's rules-of-hooks — will misbehave when the project list length changes. Refactor: pre-compute the transforms per index at the component level, or extract each item into its own component.
- [ ] **`ProjectItem` destructures props it never uses** (`description`, `image`, `technologies`, `id`) — matches the earlier finding that it renders hardcoded lorem ipsum. `src/app/portfolio/components/ProjectItem.js:5`.
- [ ] **Contradicting Tailwind classes** (`items-start` and `items-center` together) in `src/app/portfolio/components/ProjectItem.js:14`.
- [ ] **Unescaped `'` in JSX** in `src/app/portfolio/components/ProjectItem.js:24`.
- [ ] **`useEffect` missing dep** (`defaultProjects`) in `src/app/portfolio/project/[slug]/page.js:30`.
- [ ] **Deprecated Tailwind classnames** — `flex-shrink-0` → `shrink-0` migration warnings across `ProjectItem.js`.
- [ ] Tailwind classname-order warnings scattered throughout — auto-fixable via `prettier --write` (prettier-plugin-tailwindcss is already installed).

## Progress log

- **2026-09-14** — Audit performed; worklist created. Project renamed from `deadsweetpotato` → `di4nekim` in `package.json` and `package-lock.json` (folder name unchanged).
- **2026-09-14** — C3 done. `next lint` restored to working order.
- **2026-09-14** — Session 1 complete (C1, H2, H3, H4). Compile clean (`next build --no-lint` succeeds); `next build` without the flag now fails on pre-existing bugs surfaced by newly-working lint — tracked under "Discovered during audit" and must be addressed before production deploy.
