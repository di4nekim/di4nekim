# di4nekim — Site v2

Running spec for what the site should do that it doesn't yet. Organized by area of the site.
Defects and cleanup live in `docs/OPTIMIZATIONS_WORKLIST.md`. After Hours design work lives in
`docs/AFTER_HOURS_FIGMA_WORKLIST.md` (Figma file `nG7iyk0gWfecnafCcVwutG`) — **v7 is the
current direction**.

**Status:** spitball, built out progressively · **Started:** 2026-09-29 · **Reconciled:** 2026-10-21

Legend: `[ ]` open · `[x]` done · `[~]` in progress · `[-]` cut · `?` undecided

---

## The split

Two halves, two questions.

- **Experience** (on `/`) — what she can do professionally. Roles, impact, projects, each linking to a technical case study.
- **After Hours** (own page) — the oeuvre. Everything made outside of work, chronological. Between an extended résumé and an archive of a life.

Technical case studies move **out** of the portfolio page and under Experience. `/portfolio` becomes After Hours.

---

## Homepage

- [ ] Rewrite the Experience intro — still says "currently on a gap year (May '24 – Aug '25)", a window closed over a year ago.
- [x] Timeline top is now the `{year}` token, interpolated at `ExpSection.js:240`. Bottom is still a literal `––– 2021`.
- [ ] Add 2025–2026 roles to `# Experiences`.
- [ ] Settle the positioning line — `SITE.description` says "technical product manager", README says "engineer and technically experienced project manager". Pick one, use it in metadata + hero + About.
- [ ] Revisit hero + About copy. Voice is right ("hey, it's diane."), the About paragraphs drift into résumé prose.
- [ ] Point to After Hours from the homepage — the "all the hats" line in About is the natural hand-off.
- [ ] Confirm `public/resume.pdf` is current.

## Experience

- [ ] **Add new roles to the experience menu** (`# Experiences` in `content/site.md`) — title, company, dates, tech, blurb, impact for each.
  - [ ] Director of Product @ Product Space Georgetown
  - [ ] Product Management Intern @ AfterQuery
  - [ ] TERRA — semifinalist at the GIPC pitch competition
- [~] Cloud hero animation. Already built and committed (`motion.create(Image)`, scroll-linked `y` 120→-30 + fade-in), then **traded away** in the uncommitted working tree: cloud now holds still and the menu chips travel up over it (`menuY` 100→-300). Decide which reads better, or whether both move.
- [ ] Case studies reachable from the menu. Each project gets a "read the case study →" link when it has one.
  - Route shape? `/work/[slug]` recommended — keeps it clear of After Hours.
  - Opt-in per project: add a `Slug:` field, no slug = renders as today (bullets only).
  - Must be a real `<Link>` — not the `role="link"` + `setTimeout` pattern the carousel uses.
- [ ] Which projects get one? Meander and Hilltop MFI exist as named projects; KeepUp / Hoyalytics / HM on Tech are only Impact bullets today — promote?
- [ ] Case study page: problem / approach / outcome, real media, tech, links, back to the job.
- [ ] Kill or wire `ProjectItem`'s dead `link` prop — it belongs to the old model.

## After Hours

Chronological archive of non-work projects and phases. Design is further along than the code — see the Figma worklist.

**Open conflict: does the diagonal survive?** v7 dropped v6's diagonal cascade for two columns — blurbs stacked left, a `TIMELINE TICKER` rail right, flip clock at the head of the rail. The three scroll items below assume the diagonal carousel. Settle this first; it decides whether they're still real.

**Structure**

- [ ] Rename page + route (`/after-hours`?), redirect `/portfolio`, update Header + sitemap.
- [ ] Header link, or something quieter?
- [ ] Entry kinds, per v7: **project** (has a blurb, heavier tick) vs **milestone** (rail-only, lighter tick, optional subline). Plus **bounded vs ongoing** from the data-model note — bounded items are segments and flip with the clock, ongoing ones run off the edge and never flip.
- [ ] Schema in `content/site.md` replacing `# Projects`: `Start:` / `End:` as quarter codes (`24Q3`, or `ongoing`), kind, description, optional media/links. Sort by date in `src/lib/content.js`, not file order.
- [ ] The content model has **no quarters at all** today — only `Year: 24` per project. Every date on v7's ticker is an assumed reading of the gap year, not fact. Confirm or correct the nine stops before building the schema around them.
- [ ] Reconcile the entry list with Experience. v7's rail carries Hilltop Microfinance Initiative as an After Hours *project*, but it's also a Hoya Developers project and a case-study candidate above — pick one home. Digital Canvas and Urban Collective appear nowhere in v7: delete?
- [ ] Build the flip clock (`FLIP CLOCK – YYQX`) in code. Decide what drives it — scroll position, or a timed loop as prototyped.
- [ ] Finish the inventory beyond v7's nine stops.

**Scroll mechanics** *(gated on the diagonal question above)*

- [ ] Scroll hand-off from the landing. A downward scroll off `PortfolioLanding` smoothly carries the page to the carousel and settles there — no stalling half-in, half-out. Fires **only** while the landing is still the section in view and the direction is down, so it can't re-trigger from the carousel and the footer stays reachable. Details: re-arm on scrolling back up to the landing, or one-shot per visit? Cancel mid-flight if the user scrolls up. Don't fire on mount (hash deep-link, restored scroll position) — require a real gesture.
- [ ] Shrink the scrollable area. The carousel currently owns the full viewport (`h-screen w-full`, items at `50vw` × `innerHeight * 0.33`, spacing `innerHeight * 0.4`) — constrain it to a smaller band so it reads as one element on the page rather than the whole page.
- [ ] Navigation beyond scroll: jump-to-year or era rail, arrow keys, drag/swipe.
- [ ] Do entries open into a page, expand in place, or stay flat? Proposal: entries with a record open, entries without stay flat.
- [ ] Reduced-motion / no-JS fallback = plain chronological list. Worked as a toggle for everyone.

**Works with no artifact or record** — answered by v7: six of its nine stops carry no blurb. The rail is an index, and typographic weight (tick size, opacity, upright vs italic) separates a project from a milestone, so an entry with nothing to show is a well-formed entry of a different kind rather than a card missing its image. No "composed absence" frames needed.

**Writing / Substack**

- [ ] Look into the Substack API to sync posts to the site. Open: is there a usable API (or just RSS)? Build-time fetch vs. client fetch. Full posts or titles + links.
- [ ] Where does writing live — its own section, an entry kind, or an `ongoing` rail? The Hoya column currently sits under Experience.

## Site-wide

- [ ] **Mobile.** Everything under 768px hits `MobileBlocker`. Delete it and the `hidden md:block` wrapper; decide what the hero parallax and the timeline become on a phone (the list view may just *be* mobile). Test 320/390/768/1024/1440.
- [ ] **Contact.** No `mailto:`, no form, nothing anywhere on the site. `mailto:` in Header or Footer + a closing CTA after ExpSection.
- [ ] **Social preview.** No `og:image`; `twitter.card` is `summary`. Shares preview as a bare link.
- [ ] **Per-page metadata + prerender** for case studies and After Hours entries. Blocked by `[slug]/page.js` being a client component — needs a server/client split for `generateMetadata` + `generateStaticParams`.
- [ ] **Sitemap** only lists `/` and `/portfolio` — generate the rest.
- [ ] **`prefers-reduced-motion`** — zero handling across `src/`. WCAG 2.3.3.
- [ ] **Analytics** — Speed Insights only, no traffic data. `@vercel/analytics`.
- [ ] **Domain** — on `di4nekim.vercel.app`; `SITE_URL` hardcoded in `layout.js` and `sitemap.js`. Move to one constant either way.
- [ ] Custom 404, dark mode decision (empty `prefers-color-scheme` block in `globals.css`), `experience-cloud-2.png` unoptimized (120 KB).
- [ ] Figma: two old `NAVBAR – STANDARD` nodes (`29:126`, `6:51`) still carry the pre-swap header. Left on purpose; close out or clean up.

---

## Log

- **2026-09-29** — Drafted, then reframed: case studies move under Experience, `/portfolio` becomes After Hours on a real timeline. Added AfterQuery, Substack sync, cloud hero animation, carousel scroll items.
- **2026-10-21** — Reconciled against the parallel Figma work and the working tree. v7 replaces the diagonal cascade with blurbs + ticker (conflict flagged, not resolved). Artifact-less entries: answered. Taxonomy switched to project/milestone + bounded/ongoing, dates to quarter codes. Cloud animation turns out to be built-then-traded, not missing. Timeline top is now dynamic.
