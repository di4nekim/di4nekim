"use client"; // need to add this line to use framer-motion; server component by default
import React from "react";
import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";

export const Landing = () => {
  return (
    <div className="relative grid h-[300vh] grid-cols-[15%_85%] overflow-visible bg-[var(--main-red)] sm:h-[290vh] lg:h-[270vh]">
      <Sidebar className="sticky top-[40vh] z-[10] h-full" />
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
        <div className="absolute -top-[40px] left-1/2 z-10 h-3 w-3 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)] sm:h-4 sm:w-4"></div>
        <div className="absolute -top-[10px] left-1/2 z-10 h-3 w-3 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)] sm:h-4 sm:w-4"></div>

        <ul className="ml-[25px] mt-[60px] w-[15vw] text-[15px] font-semibold text-[var(--main-beige)] sm:ml-[20px] sm:text-[20px] md:ml-[30px]">
          <li>HELLO</li>
          <li className="opacity-60">ABOUT</li>
          <li className="opacity-60">EXPERIENCE</li>
          {/* <li className="opacity-60">IN THE OFF HOURS</li> */}
          {/* <li className="opacity-60">GET IN TOUCH</li> */}
        </ul>

        <div className="absolute left-1/2 top-[128vh] z-10 h-4 w-4 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)]" />
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
          hey, it&apos;s diane.
        </motion.h1>
      </div>
      {/* <div className="absolute right-0 mt-[55vh] mr-[23vh] flex z-1000 text-3xl font-medium">
        <motion.h2
          className="text-[var(--main-beige)]"
        > 
          I build things to make myself happy.
        </motion.h2>
      </div> */}
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

const ABOUT_HOOK = "I’ve always had my head up in the clouds";
const ABOUT_P1 =
  "I wear all the hats I can, from emergency medical technician to culinary school graduate, and strive to go all the way in anything I commit myself to. In my work, that translates to flexibility under pressure and creative technical solutions that makes me well-suited for both interpersonal and technical demands.";
const ABOUT_P2 =
  "When I’m not at my keyboard, I love to be a shameless amateur in my ever-changing interests and to work with my hands :)";
// const ABOUT_P3 = "Get to know me better by checking out some of the things I do for fun." // underline 'for fun', link to 'in the off hours'

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
        ABOUT ME
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mb-3 ml-[3vh] w-[60vw] font-semibold text-[var(--main-red)] sm:mx-[5vh] sm:w-[50vw] lg:text-[var(--main-beige)]"
      >
        {ABOUT_HOOK}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mb-5 ml-[3vh] w-[60vw] font-normal sm:mx-[5vh] sm:w-[50vw]"
      >
        {ABOUT_P1}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 1 }}
        className="mb-5 ml-[3vh] w-[60vw] font-normal sm:mx-[5vh] sm:w-[50vw]"
      >
        {ABOUT_P2}
      </motion.p>
    </section>
  );
};
