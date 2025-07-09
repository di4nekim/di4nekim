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

const ABOUT_HOOK = "I’ve always had my head up in the clouds";
const ABOUT_P1 = "I wear all the hats I can, from emergency medical technician to culinary school graduate, and strive to go all the way in anything I commit myself to. In my work, that translates to flexibility under pressure and creative technical solutions that makes me well-suited for both interpersonal and technical demands.";
const ABOUT_P2 = "When I’m not at my keyboard, I love to be a shameless amateur in my ever-changing interests and to work with my hands :)";
// const ABOUT_P3 = "Get to know me better by checking out some of the things I do for fun." // underline 'for fun', link to 'in the off hours'

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


    </section>
  )
}
