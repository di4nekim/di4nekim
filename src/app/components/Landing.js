'use client' // need to add this line to use framer-motion; server component by default
import React from "react";
import { useRef } from "react";
import Header from "./Header.js";
import { motion, useTransform, useMotionValueEvent, useScroll } from 'framer-motion' // importing properly

export const Landing = () => {

  return(
    <div className="h-[275vh] bg-[var(--main-red)]">
      <Hero />
    </div>
  );
}

const SECTION_HEIGHT = 800;

const Hero = () => {
  return(
    <div 
    style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full bg-[var(--main-red)]"
    >
      <ParallaxImages />
      <div className="absolute right-0 pt-[35vh] mr-[20vh] flex z-1000 text-[120px] font-medium">
        <motion.h1
          className="text-[var(--main-beige)]"
        >hey, it's
        </motion.h1>
        <motion.h1
          className="px-[30px] italic text-[var(--main-beige)]"
        >
          DIANE
        </motion.h1>

        <motion.h1
          className="text-[var(--main-beige)]"
        >
          .
        </motion.h1>
      </div>
      <div className="absolute right-0 mt-[53vh] mr-[10vh] flex z-1000 text-3xl font-medium">
        <motion.h2
          className="text-[var(--main-beige)]"
        > 
          an aspiring product manager who thinks in code.
        </motion.h2>
      </div>

    <About />
  </div>

  )
}

const ParallaxImages = () => {
  return (
    <div 
      className={"absolute right-0 w-full z-0 max-w-5xl pt-[80vh]"} // make sure absolute positioning doesn't mess with parallax
      
    >
      <Cloud 
        src={'/landing-cloud.png'}
        className={'h-[700px]'}
        start={-600}
        end={800}
      />

    </div>
  )
}

const Cloud = ({className, src, start, end}) => {
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
      className={className} 
      style={{ y }}
    />
  )
}

const ABOUT_HOOK = "I’ve always had my head up in the clouds.";
const ABOUT_P1 = "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident";
const ABOUT_P2 = "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit.";

const About = () => {
  return(
    <section 
      className="absolute ml-[20vh] h-[100vh] w-full z-1000 mx-auto max-w-5xl text-[var(--main-beige)]"
      style={{
        marginTop: `calc(${SECTION_HEIGHT}px + 100vh)`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="mb-20 text-title font-medium"
      >
        about me
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="mb-10 text-subtitle font-medium"
      >
        {ABOUT_HOOK}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="mb-5 text-paragraph font-normal"
      >
        {ABOUT_P1}   
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="mb-5 text-paragraph font-normal"
      >
        {ABOUT_P2}
      </motion.p>


    </section>
  )
}
