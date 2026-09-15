"use client"; // need to add this line to use framer-motion; server component by default
import React from "react";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ABOUT, HERO } from "@/lib/content";

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

const Sidebar = () => {
  return (
    <div className="relative z-10 h-full min-h-screen w-[15vw] bg-[var(--main-red)]">
      <div className="relative z-0 ml-[10vw] mt-[70vh] h-full w-[2px] bg-[var(--main-beige)] sm:w-[4px]">
        <div className="absolute left-1/2 top-[-40px] z-10 size-3 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)] sm:size-4"></div>
        <div className="absolute left-1/2 top-[-10px] z-10 size-3 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)] sm:size-4"></div>

        <ul className="ml-[25px] mt-[60px] w-[15vw] text-[15px] font-semibold text-[var(--main-beige)] sm:ml-[20px] sm:text-[20px] md:ml-[30px]">
          {HERO.sidebar.map((item, index) => (
            <li key={item} className={index > 0 ? "opacity-60" : undefined}>
              {item}
            </li>
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
          {HERO.headline}
        </motion.h1>
      </div>
    </div>
  );
};

const ParallaxImages = () => {
  return (
    <div
      className={"absolute z-0 w-full max-w-5xl pt-[80vh] sm:right-0"} // make sure absolute positioning doesn't mess with parallax
    >
      <Cloud
        src={"/landing-cloud.webp"}
        className={
          "h-[600px] overflow-x-clip sm:h-[700px] lg:pl-[20vh] xl:h-[700px]"
        }
        start={-600}
        end={800}
      />
    </div>
  );
};

const Cloud = ({ className, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  return (
    <motion.img
      ref={ref}
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
          className="mb-5 ml-[3vh] w-[60vw] font-normal sm:mx-[5vh] sm:w-[50vw]"
        >
          {paragraph}
        </motion.p>
      ))}
    </section>
  );
};
