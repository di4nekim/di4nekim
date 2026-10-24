"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Everything on the case study arrives the same way: pulled in from the right,
// one element after the next, under a parent that staggers its children, the
// other half of the projects screen's exit to the left (see leave.js). Each is
// also marked `data-exit`, so leaving for the projects screen slides it off to
// the right again.
export const PULL_IN = {
  out: { x: "100vw" },
  in: {
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
export const STAGGER = { in: { transition: { staggerChildren: 0.06 } } };

// react-markdown hands every component the syntax tree `node` it came from,
// which must not reach the DOM.
const domProps = (props) => {
  const rest = { ...props };
  delete rest.node;
  return rest;
};

// Keeps the classes markdown adds (a task list's "contains-task-list", a code
// fence's "language-js") alongside ours instead of replacing them.
const withClass = (className, props) => ({
  ...domProps(props),
  className: [className, props.className].filter(Boolean).join(" "),
});

// A block-level markdown element that pulls in with the rest.
const block = (tag, className) =>
  function Block(props) {
    const Tag = motion[tag];
    return (
      <Tag data-exit variants={PULL_IN} {...withClass(className, props)} />
    );
  };

// Wide tables scroll sideways instead of widening the page.
function Table(props) {
  return (
    <motion.div data-exit variants={PULL_IN} className="overflow-x-auto">
      <table
        {...withClass(
          "w-full border-collapse text-left text-base sm:text-lg",
          props,
        )}
      />
    </motion.div>
  );
}

const cell = (tag, className) =>
  function Cell(props) {
    const Tag = tag;
    return (
      <Tag
        {...withClass(
          `border-b border-[#CB0000]/30 px-3 py-2 ${className}`,
          props,
        )}
      />
    );
  };

const isBlank = (child) => child.type === "text" && !child.value.trim();
const isImage = (child) => child.type === "element" && child.tagName === "img";

// Images on a line of their own are a row: side by side from md up.
function Paragraph({ node, children, ...props }) {
  const kids = node.children.filter((child) => !isBlank(child));
  if (kids.length && kids.every(isImage)) {
    return (
      <div
        className={`grid grid-cols-1 gap-8 ${kids.length > 1 ? "md:grid-cols-2" : ""}`}
      >
        {children}
      </div>
    );
  }
  return (
    <motion.p
      data-exit
      variants={PULL_IN}
      className="text-base leading-relaxed sm:text-lg"
      {...props}
    >
      {children}
    </motion.p>
  );
}

// No URL is a placeholder (the gray "Project Image" box); a real image shows
// the same box pulsing until it has loaded. Spans throughout, so an image
// inline in a sentence is still valid inside its <p>.
function ProjectImage({ src, alt = "" }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish before hydration attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, [src]);

  if (!src) {
    return (
      <motion.span
        data-exit
        variants={PULL_IN}
        className="flex h-64 items-center justify-center rounded-lg bg-gray-200 text-base text-gray-500"
      >
        {alt}
      </motion.span>
    );
  }

  return (
    <motion.span
      data-exit
      variants={PULL_IN}
      className={`relative block min-h-64 overflow-hidden rounded-lg bg-gray-200 ${loaded ? "" : "animate-pulse motion-reduce:animate-none"}`}
    >
      {/* Markdown images have no known size, so next/image can't lay them out. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`block w-full transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </motion.span>
  );
}

function Anchor(props) {
  const { href = "" } = props;
  const external = /^https?:\/\//.test(href);
  return (
    <a
      {...domProps(props)}
      className="underline underline-offset-4 transition-opacity hover:opacity-70"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    />
  );
}

const COMPONENTS = {
  // The page's title is the only h1, so a "#" in the file reads as a section.
  h1: block("h2", "mt-6 text-2xl font-bold sm:text-3xl"),
  h2: block("h2", "mt-6 text-2xl font-bold sm:text-3xl"),
  h3: block("h3", "mt-2 text-xl font-bold sm:text-2xl"),
  h4: block("h4", "text-lg font-bold sm:text-xl"),
  p: Paragraph,
  img: ProjectImage,
  a: Anchor,
  // A "- [ ]" task list drops the bullets; its checkboxes stand in for them.
  ul: block(
    "ul",
    "list-disc space-y-2 pl-6 text-base leading-relaxed sm:text-lg [&.contains-task-list]:list-none [&.contains-task-list]:pl-0",
  ),
  ol: block(
    "ol",
    "list-decimal space-y-2 pl-6 text-base leading-relaxed sm:text-lg",
  ),
  blockquote: block(
    "blockquote",
    "border-l-2 border-[#CB0000] pl-4 text-lg leading-relaxed sm:text-xl",
  ),
  hr: block("hr", "border-[#CB0000]/30"),
  // Inline code gets a tint; inside a fenced block the <pre> already has one.
  code: (props) => (
    <code
      {...withClass(
        "rounded bg-[#CB0000]/10 px-1 font-mono text-[0.9em] [pre_&]:bg-transparent [pre_&]:p-0",
        props,
      )}
    />
  ),
  pre: block("pre", "overflow-x-auto rounded-lg bg-[#CB0000]/10 p-4 text-sm"),
  // GitHub-flavored extras, via remark-gfm.
  table: Table,
  th: cell("th", "font-bold"),
  td: cell("td", ""),
  input: (props) => <input {...withClass("mr-2 accent-[#CB0000]", props)} />,
};

export default function CaseStudyMarkdown({ source }) {
  return (
    <motion.div variants={STAGGER} className="flex flex-col gap-6">
      <Markdown components={COMPONENTS} remarkPlugins={[remarkGfm]}>
        {source}
      </Markdown>
    </motion.div>
  );
}
