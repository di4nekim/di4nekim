// Loads all site copy from content/site.md (see the comment at the top of
// that file for the format). The .md is bundled as a raw string via the
// webpack rule in next.config.mjs, so edits show up on save in dev and on
// the next deploy in production. A missing required heading or field throws
// here, which fails `next build` instead of shipping a blank section.
import SOURCE from "../../content/site.md";
import { PROJECTS } from "./projects";

const FILE = "content/site.md";
const HEADING_RE = /^(#{1,6})\s+(.+?)\s*$/;
const BULLET_RE = /^[-*+]\s+(.*)$/;
const FIELD_RE = /^([^\s:][^:]*?):\s+(\S.*)$/;

function parse(source) {
  const root = { title: "", level: 0, lines: [], children: [] };
  const stack = [root];
  const cleaned = source
    .replace(/\r\n?/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, "");

  for (const line of cleaned.split("\n")) {
    const heading = HEADING_RE.exec(line);
    if (!heading) {
      stack[stack.length - 1].lines.push(line);
      continue;
    }
    const node = {
      title: heading[2],
      level: heading[1].length,
      lines: [],
      children: [],
    };
    while (stack[stack.length - 1].level >= node.level) stack.pop();
    stack[stack.length - 1].children.push(node);
    stack.push(node);
  }
  return root;
}

const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
const where = (node) => (node.title ? `under "${node.title}"` : "at top level");

function optionalSection(node, title) {
  return node.children.find((c) => same(c.title, title)) ?? null;
}

function section(node, title) {
  const found = optionalSection(node, title);
  if (!found) {
    const hashes = "#".repeat(node.level + 1);
    throw new Error(`${FILE}: missing "${hashes} ${title}" ${where(node)}`);
  }
  return found;
}

// Blank-line-separated paragraphs, with hard-wrapped lines rejoined.
function paragraphs(node) {
  const out = [];
  let current = [];
  for (const raw of node?.lines ?? []) {
    const line = raw.trim();
    if (line) {
      current.push(line);
    } else if (current.length) {
      out.push(current.join(" "));
      current = [];
    }
  }
  if (current.length) out.push(current.join(" "));
  return out;
}

const text = (node) => paragraphs(node).join(" ");

const list = (node) =>
  (node?.lines ?? [])
    .map((line) => BULLET_RE.exec(line.trim()))
    .filter(Boolean)
    .map((match) => match[1]);

// "Label: value" lines, in order.
const fields = (node) =>
  (node?.lines ?? [])
    .map((line) => FIELD_RE.exec(line.trim()))
    .filter(Boolean)
    .map(([, label, value]) => ({ label, value }));

function field(node, label, { required = true } = {}) {
  const found = fields(node).find((f) => same(f.label, label));
  if (!found && required) {
    throw new Error(`${FILE}: missing "${label}: ..." ${where(node)}`);
  }
  return found?.value ?? null;
}

// Timeline stops' quarters are YYQX, the same code the flip clock shows.
const QUARTER_RE = /^\d{2}Q[1-4]$/;

function quarter(node) {
  const value = field(node, "Quarter");
  if (!QUARTER_RE.test(value)) {
    throw new Error(
      `${FILE}: "Quarter: ${value}" ${where(node)} is not a quarter like "24Q4"`,
    );
  }
  return value;
}

function assertUnique(values, what) {
  const duplicate = values.find((value, i) => values.indexOf(value) !== i);
  if (duplicate !== undefined) {
    throw new Error(`${FILE}: duplicate ${what} "${duplicate}"`);
  }
}

const doc = parse(SOURCE);

const site = section(doc, "Site");
export const SITE = {
  description: text(section(site, "Description")),
  footer: text(section(site, "Footer")),
};

const header = section(doc, "Header");
export const HEADER = {
  name: text(section(header, "Name")),
  afterHoursName: text(section(header, "After-hours name")),
  links: fields(section(header, "Links")).map(({ label, value }) => ({
    label,
    href: value,
  })),
  afterHoursLinks: fields(section(header, "After-hours links")).map(
    ({ label, value }) => ({
      label,
      href: value,
      hoverText: field(section(header, "After-hours hover text"), label, {
        required: false,
      }),
    }),
  ),
  resumeDownloadName: text(section(header, "Resume download name")),
};

const mobile = section(doc, "Mobile Blocker");
export const MOBILE_BLOCKER = {
  eyebrow: text(section(mobile, "Eyebrow")),
  heading: text(section(mobile, "Heading")),
  message: text(section(mobile, "Message")),
};

const hero = section(doc, "Hero");
export const HERO = {
  headline: text(section(hero, "Headline")),
  sidebar: list(section(hero, "Sidebar")),
};

const about = section(doc, "About");
export const ABOUT = {
  heading: text(section(about, "Heading")),
  hook: text(section(about, "Hook")),
  paragraphs: paragraphs(section(about, "Paragraphs")),
  bullets: list(section(about, "Bullets")),
};

const experience = section(doc, "Experience");
export const EXPERIENCE = {
  sidebarLabel: text(section(experience, "Sidebar label")),
  hook: paragraphs(section(experience, "Hook")),
  currentlyLabel: text(section(experience, "Currently label")),
  currentlyBullets: list(section(experience, "Currently bullets")),
  previouslyLabel: text(section(experience, "Previously label")),
  previouslyBullets: list(section(experience, "Previously bullets")),
  leadIn: text(section(experience, "Lead-in")),
  timelineTop: text(section(experience, "Timeline top")),
  timelineBottom: text(section(experience, "Timeline bottom")),
  impactHeading: text(section(experience, "Impact heading")),
  projectsHeading: text(section(experience, "Projects heading")),
};

export const EXPERIENCES = section(doc, "Experiences").children.map((job) => {
  const tech = field(job, "Tech", { required: false });
  const projects = optionalSection(job, "Projects");
  return {
    key: job.title,
    title: field(job, "Title"),
    company: field(job, "Company"),
    dates: field(job, "Dates"),
    tech: tech
      ? tech
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    blurb: paragraphs(optionalSection(job, "Blurb")),
    impact: list(optionalSection(job, "Impact")),
    projects: (projects?.children ?? []).map((project) => ({
      name: project.title,
      site: field(project, "Site", { required: false }),
      bullets: list(project),
    })),
    links: fields(optionalSection(job, "Links")).map(({ label, value }) => ({
      label,
      href: value,
    })),
  };
});
assertUnique(
  EXPERIENCES.map((job) => job.key),
  "experience",
);

const afterHours = section(doc, "After Hours");
export const AFTER_HOURS = {
  backLink: text(section(afterHours, "Back link")),
  notFound: text(section(afterHours, "Not found")),
  clockLabel: text(section(afterHours, "Clock label")),
};

function projectNamed(node, name) {
  const found = PROJECTS.find((project) => same(project.title, name));
  if (!found) {
    throw new Error(
      `${FILE}: "Project: ${name}" ${where(node)} names no project titled "${name}" in content/projects.json`,
    );
  }
  return found;
}

// The After Hours rail. Oldest first; the stop carrying "Project: ..." is the
// one the blurb column is focused on.
export const TIMELINE = section(doc, "Timeline").children.map((stop) => {
  const name = field(stop, "Project", { required: false });
  const project = name ? projectNamed(stop, name) : null;
  return {
    label: stop.title,
    quarter: quarter(stop),
    note: field(stop, "Note", { required: false }),
    projectId: project?.id ?? null,
    hasCaseStudy: Boolean(project?.caseStudy),
  };
});

// Every project is a stop — the rail is how the blurb column is navigated, so
// a project missing from it would be unreachable from the ticker.
for (const project of PROJECTS) {
  if (!TIMELINE.some((stop) => stop.projectId === project.id)) {
    throw new Error(
      `${FILE}: project "${project.title}" (content/projects.json) has no stop under "# Timeline"`,
    );
  }
}
