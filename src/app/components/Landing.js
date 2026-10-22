"use client"; // need to add this line to use framer-motion; server component by default
import React from "react";
import {
  motion,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { ABOUT, HERO } from "@/lib/content";
import Scramble from "./Scramble.js";

export const Landing = () => {
  return (
    <div className="relative grid h-[300vh] grid-cols-[15%_85%] overflow-visible bg-[var(--main-red)] sm:h-[290vh] lg:h-[270vh]">
      <Sidebar className="sticky top-[40vh] z-10 h-full" />
      <div className="flex w-full flex-col">
        <Hero />
        <About />
      </div>
    </div>
  );
};

// Entrance on first render: a short rise into place. Same easing as
// DiagonalReveal's settle.
const ENTER = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

const Sidebar = () => {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative z-10 h-full min-h-screen w-[15vw] bg-[var(--main-red)]">
      <div className="relative z-0 ml-[10vw] mt-[70vh] h-full w-[2px] bg-[var(--main-beige)] sm:w-[4px]">
        <div className="absolute left-1/2 top-[-40px] z-10 size-3 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)] sm:size-4"></div>
        <div className="absolute left-1/2 top-[-10px] z-10 size-3 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)] sm:size-4"></div>

        <ul className="ml-[25px] mt-[60px] w-[15vw] text-[15px] font-semibold text-[var(--main-beige)] sm:ml-[20px] sm:text-[20px] md:ml-[30px]">
          {HERO.sidebar.map((item, index) => (
            <motion.li
              key={item}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: index > 0 ? 0.6 : 1, y: 0 }}
              transition={{ ...ENTER, delay: 0.4 + index * 0.12 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="absolute left-1/2 top-[128vh] z-10 size-4 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)]" />
      </div>
    </div>
  );
};

const SECTION_HEIGHT = 800;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 50vh)` }}
      className="relative z-0 w-full bg-[var(--main-red)]"
    >
      <ParallaxImages />
      <div className="z-1000 absolute right-0 mr-[3vw] flex pt-[45vh] text-[50px] font-medium sm:mr-[5vw] sm:pt-[40vh] sm:text-[80px] md:mr-[3vw] md:pt-[38vh] md:text-[100px] lg:mr-[5vh] lg:pt-[35vh] lg:text-[120px] xl:mr-[5vh] xl:pt-[40vh]">
        <motion.h1 className="text-[var(--main-beige)]">
          <Headline text={HERO.headline} />
        </motion.h1>
      </div>
    </div>
  );
};

// The name in the headline scrambles before it settles; the rest is plain
// type. If the copy in site.md ever drops the name, it all stays plain.
const NAME = "di4ne";

const Headline = ({ text }) => {
  const at = text.toLowerCase().indexOf(NAME);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <Scramble text={text.slice(at, at + NAME.length)} />
      {text.slice(at + NAME.length)}
    </>
  );
};

const ParallaxImages = () => {
  const reduceMotion = useReducedMotion();
  // The entrance rides on this wrapper so it doesn't fight the scroll-linked
  // `y` on the image itself. The micro fade is plain CSS so it runs from the
  // first paint instead of waiting for hydration.
  return (
    <motion.div
      initial={reduceMotion ? false : { y: 60 }}
      animate={{ y: 0 }}
      transition={{ ...ENTER, duration: 1.2 }}
      className={
        "absolute z-0 w-full max-w-5xl animate-fade-in pt-[80vh] motion-reduce:animate-none sm:right-0"
      } // make sure absolute positioning doesn't mess with parallax
    >
      <Cloud
        src={"/landing-cloud.webp"}
        className={
          "h-[600px] overflow-x-clip sm:h-[700px] lg:pl-[20vh] xl:h-[700px]"
        }
        rest={-236}
        drift={0.47}
        end={800}
      />
    </motion.div>
  );
};

// Parallax off the page scroll alone: `rest` px at the top of the page,
// drifting down `drift` px per px scrolled, up to `end`. Driven by scroll
// position rather than the image's place in the viewport so the server can
// render the exact starting offset; a viewport-relative parallax can only be
// measured in the browser, and the cloud would jump once it was.
const Cloud = ({ className, src, rest, drift, end }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (s) => Math.min(rest + s * drift, end));

  return (
    <motion.img
      src={src}
      alt=""
      className={className}
      style={{ y }}
    />
  );
};

const About = () => {
  return (
    <section
      className="z-1000 lg:z-1000 absolute mx-auto h-[60vh] max-w-5xl text-[16px] text-[var(--main-beige)] sm:text-[20px] lg:absolute lg:mx-auto lg:h-[60vh] lg:max-w-5xl lg:text-[var(--main-beige)]"
      style={{
        marginTop: `calc(${SECTION_HEIGHT}px + 100vh)`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mb-[20px] ml-[3vh] font-semibold sm:mx-[5vh]"
      >
        {ABOUT.heading}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mb-3 ml-[3vh] w-[60vw] font-semibold text-[var(--main-red)] sm:mx-[5vh] sm:w-[50vw] lg:text-[var(--main-beige)]"
      >
        {ABOUT.hook}
      </motion.p>

      {ABOUT.paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="mb-5 ml-[3vh] w-[60vw] font-normal leading-tight sm:mx-[5vh] sm:w-[50vw]"
        >
          {paragraph}
        </motion.p>
      ))}

      <motion.ul
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mb-2 ml-[3vh] w-[60vw] font-normal sm:mx-[5vh] sm:w-[50vw]"
      >
        {ABOUT.bullets.map((bullet, index) => (
          <li
            key={index}
            className="leading-tight before:mr-2 before:content-['–_']"
          >
            {bullet}
          </li>
        ))}
      </motion.ul>
    </section>
  );
};
