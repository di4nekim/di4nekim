// Loads the After Hours projects from content/projects.json (shape documented
// in content/projects.schema.json). Checks the rules the schema can't express
// and throws on a bad entry, which fails `next build` instead of shipping a
// broken page.
import DATA from "../../content/projects.json";

const FILE = "content/projects.json";
const MONTH_RE = /^(\d{4})-(0[1-9]|1[0-2])(-\d{2})?$/;
const MONTHS = "JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC".split(" ");

// The "(Oct - Dec)" tag on a blurb is its quarter spelled out, so the two can
// never disagree.
const QUARTER_MONTHS = {
  1: "Jan - Mar",
  2: "Apr - Jun",
  3: "Jul - Sep",
  4: "Oct - Dec",
};

// Case studies are bundled as raw strings by the .md webpack rule in
// next.config.mjs. Comments are stripped so the markdown renderer never sees
// them.
const CASE_STUDY_FILES = require.context(
  "../../content/case-studies",
  false,
  /\.md$/,
);

function fail(message) {
  throw new Error(`${FILE}: ${message}`);
}

function parseMonth(value, where) {
  const match = MONTH_RE.exec(value ?? "");
  if (!match) fail(`${where} "${value}" must be YYYY-MM or YYYY-MM-DD`);
  return { year: match[1], month: Number(match[2]) };
}

const monthLabel = ({ year, month }) => `${MONTHS[month - 1]} ${year}`;

function readCaseStudy(item, where) {
  if (!item.caseStudy) return null;
  const file = `./${item.caseStudy.replace(/^case-studies\//, "")}`;
  if (!CASE_STUDY_FILES.keys().includes(file)) {
    fail(`${where} caseStudy "${item.caseStudy}" has no file in content/`);
  }
  return CASE_STUDY_FILES(file)
    .replace(/<!--[\s\S]*?-->/g, "")
    .trim();
}

export const CATEGORIES = DATA.categories;

export const PROJECTS = DATA.items.map((item) => {
  const where = `"${item.slug ?? item.title}"`;
  for (const key of ["slug", "title", "kind", "category", "blurb"]) {
    if (!item[key]) fail(`${where} is missing "${key}"`);
  }
  const categories = CATEGORIES[item.kind];
  if (!categories) fail(`${where} has unknown kind "${item.kind}"`);
  const category = categories.find((c) => c.id === item.category);
  if (!category) {
    fail(
      `${where} category "${item.category}" is not in categories.${item.kind}`,
    );
  }
  const start = parseMonth(item.date?.start, `${where} date.start`);
  // end: absent = one-off, null = ongoing (NOW), string = finished.
  const end = item.date?.end;
  let dateLabel = monthLabel(start);
  if (end === null) {
    dateLabel += " – NOW";
  } else if (end !== undefined) {
    dateLabel += ` – ${monthLabel(parseMonth(end, `${where} date.end`))}`;
  }

  const year = start.year.slice(2);
  const q = Math.ceil(start.month / 3);
  const blurb = item.blurb
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    // The slug doubles as the id the After Hours components key on, and as
    // the case study's URL: /after-hours/project/<slug>.
    id: item.slug,
    slug: item.slug,
    title: item.title,
    kind: item.kind,
    category: category.id,
    categoryLabel: category.label,
    year,
    quarter: `${year}Q${q}`,
    months: QUARTER_MONTHS[q],
    dateLabel,
    // Joined for the case study page; split for the blurbs, which set a
    // blank line between paragraphs.
    description: blurb.join(" "),
    blurb,
    caseStudy: readCaseStudy(item, where),
    images: item.images ?? [],
    links: item.links ?? [],
  };
});

const duplicate = PROJECTS.map((p) => p.slug).find(
  (slug, i, slugs) => slugs.indexOf(slug) !== i,
);
if (duplicate) fail(`duplicate slug "${duplicate}"`);

// PROJECTS is every item, which is what the timeline indexes. Only items with
// a case study get a blurb and a page; the rest show only as their stop.
// Both lists are module-scoped so their identity is stable across renders.

// /after-hours: both kinds, in file order.
export const CASE_STUDIES = PROJECTS.filter((p) => p.caseStudy);

// /projects and /portfolio: one kind each, keyed by kind.
export const CASE_STUDIES_BY_KIND = Object.fromEntries(
  Object.keys(CATEGORIES).map((kind) => [
    kind,
    CASE_STUDIES.filter((p) => p.kind === kind),
  ]),
);
