'use client'
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { Cambay } from 'next/font/google';

// TO DO : insert link to gap year page later
const EDUCATION_BLURB = {
  title: "Computer Science B.Sc. & Cognitive Science Minor",
  company: "Georgetown University",
  p1: "Though I’m currently on a gap year (May ‘24 - Aug ‘25), I’m a student at Georgetown University working on my B.Sc. in Computer Science and minor in Cognitive Science.",
  p2: "There, I’ve honed my skills in advanced programming, data structures, and user-focused product development. From redesigning scalable React applications to leading high-impact projects for clients through Georgetown’s premier software development club, I thrive at the intersection of technology, design, and collaboration.",
  impact_1: "",
}

const EXP_OVERVIEW = {
  p1: "Though I’m currently on a gap year (May ‘24 - Aug ‘25), I’m a student at Georgetown University working on my B.Sc. in Computer Science and minor in Cognitive Science. There, I’ve honed my skills in advanced programming, data structures, and user-focused product development. From redesigning scalable React applications to leading high-impact projects for clients through Georgetown’s premier software development club, I thrive at the intersection of technology, design, and collaboration.",
  p2: "Outside the classroom, I’ve built full-stack applications, led cross-functional teams, and shaped product strategies to bring innovative ideas to life. Whether it’s crafting scalable platforms with React and Firebase or designing intuitive interfaces and data-driven models, I thrive on solving complex problems where technology and design meet."
}

const EXP_1_BLURB = {
  title: "Software Engineering Intern",
  company: "KeepUp Technologies",
  date: "May ‘24 - current",
  p1: "",
  p2: "",
  impact_1: "",
}

const EXP_2_BLURB = {
  title: "Software Engineering Intern",
  company: "KeepUp Technologies",
  date: "May ‘24 - current",
  p1: "",
  p2: "",
  impact_1: "",
}


const Experience = () => {
  const parentRef = useRef(null);
  const { scrollY } = useScroll();

  // const y = useTransform(scrollY, [2150, 2500], [300, 600]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((value) => {
      if (value > 2150 && value < 2400){
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [scrollY]);


  return (
    <div ref={parentRef} className='h-[250vh] grid grid-cols-[30%_70%]'>
      <Sidebar parentRef={parentRef} className='sticky z-[20] top-[40vh]'/>

      {/* overview */}
      <div className='relative flex flex-col bg-[var(--main-beige)] text-[var(--main-red)] '>
        <AnimatePresence>
          {isVisible && (
            <motion.section 
            className='sticky top-[50vh] z-[10] h-[10vh] mr-[20vw]'
            // className='relative mt-[50vh] z-[10] h-[10vh] mr-[20vw]'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ease: "easeInOut", duration: 0.3}}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className='mb-[10px]'>{EXP_OVERVIEW.p1}</p>
            <p>{EXP_OVERVIEW.p2}</p>
          </motion.section>
          )}
        </AnimatePresence>

        {/* experience section */}
        <section className='absolute w-full h-[100vh] mt-[140vh] text-[var(--main-red)] bg-[var(--main-beige)]'>
          <Role />
          <Blurb />
        </section>

      </div>

    </div>
  );
};

const Sidebar = ({parentRef}) => {

  const lenisRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      smooth: true,
      lerp: 0.15, // Default is 0.1 (lower = smoother, higher = stiffer)
      smoothTouch: true, // Enable smooth scrolling on touch devices
    });
    lenisRef.current = lenis;



    // Update scrollY on scroll
    const handleScroll = () => {
      setScrollY(lenis.scroll); // Lenis provides the current scroll position
    };

    lenis.on("scroll", handleScroll);
    console.log(lenis.scroll);

    // Start Lenis
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Cleanup Lenis on unmount
    };
  }, []);

  const scrollValue = useMotionValue(scrollY);
  const topPos = useTransform(scrollValue, [2000, 2150, 2500, 3000], [100, 300, 600, 1100]);
  const scaleValue = useTransform(scrollValue, [2000, 2150, 2500, 2700, 4000], [1, 2, 2, 1, 1]);
  const translateX = useTransform(scrollValue, [2000, 2150, 2500, 2700, 4000], ["5vw", "20vw", "20vw", "5vw", "5vw"]);

  useEffect(() => {
    scrollValue.set(scrollY); // Update Framer Motion's MotionValue on scroll
    console.log(scrollY);
  }, [scrollY, scrollValue]);

  return(
    <div className="relative h-full z-10 bg-[var(--main-beige)]">
      <div className="absolute z-0 ml-[10vw] h-full w-[4px] bg-[var(--main-red)] text-[var(--main-red)]">

        {/* <motion.div 
          style={{ y: yTranslate }} 
          className="absolute top-[10vh] left-1/2 transform -translate-x-1/2 z-10 w-9 h-10 bg-[var(--main-beige)] rounded-full">
        </motion.div> */}

        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 z-10 w-6 h-6 bg-[var(--main-red)] rounded-full"
          style={{ 
            top: topPos,
          }}  
        />
        <motion.h1 
          className='absolute text-[20px] font-bold'
          style={{
            top: topPos,
            scale: scaleValue,
            translateX: translateX,
            transformOrigin: "left center", // Anchor scaling to the left
          }}
        >
          EXPERIENCE
        </motion.h1>

      </div>

    </div>
  )
}

const Role = ({title, company}) => {
  return (
    <div className='relative w-full text-[30px] '>
      <div className='flex flex-row font-semibold'>
        <h1>
          {/* {title}  */}
          EXAMPLE ROLE
        </h1>
        <h1 className='ml-[5px] text-[var(--main-blue)]'>
          {/* @ {company} */}
          @ EXAMPLE COMPANY
        </h1>
      </div>

      <p className='text-[20px] italic text-[var(--main-blue)]'>
        (MAY 'XX - JUN 'XX)
      </p>

    </div>
  )
}

const Blurb = () => {
  return (
    <div className='mt-[5vh] mr-[25vw]'>
      {/* insert arrow icon */}
      <p className='leading-tight'>
        Though I’m currently on a gap year (May ‘24 - Aug ‘25), I’m a student at Georgetown University working on my B.Sc. in Computer Science and minor in Cognitive Science.
      </p>
    </div>
  )
}

const Impact = () => {

}

const Projects = () => {

}


export default Experience;