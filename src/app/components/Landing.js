'use client' // need to add this line to use framer-motion; server component by default
import React from "react";
import { useRef } from "react";
import { motion, useTransform, useMotionValueEvent, useScroll } from 'framer-motion'
import useLenis from '../hooks/useLenis';

export const Landing = () => {
  useLenis();

  return(
    <div className="relative grid grid-cols-[15%_85%] h-[270vh] bg-[var(--main-red)] overflow-visible">
      <Sidebar className='sticky h-full z-[10] top-[40vh]'/>
      <div className="w-full flex flex-col">
        <Hero />
        <About />
      </div>
    </div>
  );
}

const Sidebar = () => {
  return (
    <div className="relative w-[15vw] h-full z-10 min-h-screen bg-[var(--main-red)]">
      <div className="relative z-0 mt-[70vh] ml-[10vw] h-full w-[4px] bg-[var(--main-beige)]">
        <div className="absolute -top-[40px] left-1/2 transform -translate-x-1/2 z-10 w-4 h-4 bg-[var(--main-beige)] rounded-full"></div>
        <div className="absolute -top-[10px] left-1/2 transform -translate-x-1/2 z-10 w-4 h-4 bg-[var(--main-beige)] rounded-full"></div>
        
        <ul className='w-[15vw] ml-[30px] mt-[60px] text-[20px] text-[var(--main-beige)] font-semibold'>
          <li>HELLO</li>
          <li className="opacity-60">ABOUT</li>
          <li className="opacity-60">EXPERIENCE</li>
          {/* <li className="opacity-60">IN THE OFF HOURS</li> */}
          {/* <li className="opacity-60">GET IN TOUCH</li> */}
        </ul>

        <div className="absolute top-[128vh] left-1/2 transform -translate-x-1/2 z-10 w-4 h-4 bg-[var(--main-beige)] rounded-full" />

      </div>

    </div>
  );
};

const SECTION_HEIGHT = 800;

const Hero = () => {
  return(
    <div 
    style={{ height: `calc(${SECTION_HEIGHT}px + 50vh)` }}
      className="relative z-0 w-full bg-[var(--main-red)]"
    >
      <ParallaxImages />
      <div className="absolute right-0 pt-[39vh] mr-[20vh] flex z-1000 text-[120px] font-medium">
        <motion.h1
          className="text-[var(--main-beige)]"
        >hey, it's diane.
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

const ABOUT_HOOK = "I’ve always had my head up in the clouds";
const ABOUT_P1 = "I wear all the hats I can, and strive to go all the way in anything I commit myself to. In my work, that translates to creative technical solutions and a flexibility that makes me well suited for both interpersonal and technical work. I love being involved with products at both a high and granular level, and there’s nothing more fulfilling than being on a team that makes it—whatever ‘it’ is—happen.";
const ABOUT_P2 = "When I’m not at my keyboard, I have a penchant for being an amateur and working with my hands :)";
// const ABOUT_P3 = "Get to know me better by checking out some of the things I do for fun." // underline 'for fun', link to 'in the off hours'

const About = () => {
  return(
    <section 
      className="absolute h-[60vh] z-1000 mx-auto max-w-5xl text-[var(--main-beige)]"
      style={{
        marginTop: `calc(${SECTION_HEIGHT}px + 100vh)`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        // className="mb-[35px] mx-[5vh] text-title font-bold"
        className="mb-[20px] mx-[5vh] text-[20px] font-semibold"
      >
        ABOUT ME
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[50vw] mb-3 mx-[5vh] text-paragraph font-semibold"
      >
        {ABOUT_HOOK}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[50vw] mb-5 mx-[5vh] text-paragraph font-normal"
      >
        {ABOUT_P1}   
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[50vw] mb-5 mx-[5vh] text-paragraph font-normal"
      >
        {ABOUT_P2}
      </motion.p>

      {/*   
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="mb-5 mx-[5vh] text-paragraph font-normal"
      >
        {ABOUT_P3}
      </motion.p> */}


    </section>
  )
}
