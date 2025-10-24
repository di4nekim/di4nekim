'use client' // need to add this line to use framer-motion; server component by default
import React from "react";
import { useRef } from "react";
import { motion, useTransform, useScroll } from 'framer-motion'
import useLenis from '../hooks/useLenis';

export const Landing = () => {
  useLenis();

  return(
    <div className="relative grid grid-cols-[15%_85%] h-[300vh] bg-[var(--main-red)] overflow-visible
                    sm:h-[290vh]
                    lg:h-[270vh]
                    ">
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
      <div className="relative z-0 mt-[70vh] ml-[10vw] h-full w-[2px] bg-[var(--main-beige)]
                      sm:w-[4px]">
        <div className="absolute -top-[40px] left-1/2 transform -translate-x-1/2 z-10 w-3 h-3 bg-[var(--main-beige)] rounded-full
                        sm:w-4 sm:h-4
                        "></div>
        <div className="absolute -top-[10px] left-1/2 transform -translate-x-1/2 z-10 w-3 h-3 bg-[var(--main-beige)] rounded-full
                        sm:w-4 sm:h-4
                        "></div>
        
        <ul className='w-[15vw] ml-[25px] mt-[60px] text-[15px] text-[var(--main-beige)] font-semibold
                      sm:text-[20px] sm:ml-[20px]
                      md:ml-[30px]
                      '>
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
      <div className="absolute flex right-0 pt-[45vh] mr-[3vw] z-1000 text-[50px] font-medium 
                      sm:pt-[40vh] sm:mr-[5vw] sm:text-[80px]
                      md:pt-[38vh] md:text-[100px] md:mr-[3vw]
                      lg:text-[120px] lg:pt-[35vh] lg:mr-[5vh] 
                      xl:pt-[40vh] xl:mr-[5vh] ">
        <motion.h1 className="text-[var(--main-beige)]">
          hey, it's diane.
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
      className={"absolute sm:right-0 w-full z-0 max-w-5xl pt-[80vh]"} // make sure absolute positioning doesn't mess with parallax
    >
      <Cloud 
        src={'/landing-cloud.png'}
        className={"h-[600px] overflow-x-clip sm:h-[700px] lg:pl-[20vh] xl:h-[700px]"}
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

const ABOUT_HOOK = "I've been a project manager my whole life–I just don't have the job title yet.";
const ABOUT_P1 = "I wear all the hats I can, from emergency medical technician to project manager to culinary school graduate, because creative solutions can only be honed through diverse experiences and a hands-on curiosity.";
const ABOUT_P2 = "Even when I’m not at my keyboard, I treat each goal like a project to scope, execute, and complete. Here are some I've taken from 0 to 1:";
const ABOUT_BULLETS = [
  "Division I Top 64 Epee fencer @ 16",
  "Attaining my EMT certification (NREMT)",
  "Programme de Cuisine @ Le Cordon Bleu Madrid",
  "A2 proficiency in Spanish in 2 months",
  "Goodreads reading challenge, 2020 - 2025",
  "Advice Column @ The Hoya",
  "Worked as a florist"
];

const About = () => {
  return(
    <section 
      className="absolute h-[60vh] text-[16px] z-1000 mx-auto max-w-5xl text-[var(--main-beige)]
                sm:text-[20px]
                lg:absolute lg:h-[60vh] lg:z-1000 lg:mx-auto lg:max-w-5xl lg:text-[var(--main-beige)]
                  "
      style={{
        marginTop: `calc(${SECTION_HEIGHT}px + 100vh)`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="mb-[20px] ml-[3vh] sm:mx-[5vh] font-semibold"
      >
        ABOUT ME
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[60vw] sm:w-[50vw] mb-3 ml-[3vh] sm:mx-[5vh] font-semibold text-[var(--main-red)] lg:text-[var(--main-beige)]"
      >
        {ABOUT_HOOK}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[60vw] sm:w-[50vw] mb-5 ml-[3vh] sm:mx-[5vh] font-normal"
      >
        {ABOUT_P1}   
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[60vw] sm:w-[50vw] mb-5 ml-[3vh] sm:mx-[5vh] font-normal"
      >
        {ABOUT_P2}
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ease: "easeInOut", duration: 1}}
        className="w-[60vw] sm:w-[50vw] mb-2 ml-[3vh] sm:mx-[5vh] font-normal"
      >
        {ABOUT_BULLETS.map((bullet, index) => (
          <li key={index} className="before:content-['–_'] before:mr-2 leading-tight">
            {bullet}
          </li>
        ))}
      </motion.ul>


    </section>
  )
}
