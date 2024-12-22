'use client'
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { EXP_OVERVIEW } from '../data/ExperienceData';
import Button from './Button';
import ExperienceCloud2 from '../../../public/experience-cloud-2.png';

import ExpSection from './ExpSection';


const Experience = () => {

  // const sectionRef = useRef(null);
  // const normalizedScroll = useMotionValue(0); // Local scroll position
  // const scrollY = useMotionValue(0); // Framer Motion value to track scroll
        
  // TAKE 3: ditch lenis, use useScroll's native target and offset props to dynamically preserve animation layouts despite viewport resizing
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({target: ref});

  useEffect(() => {
    scrollYProgress.onChange((value) => console.log("scrollYProgress:", value));
  }, [scrollYProgress]);

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1], // works @ h-[1500px], but is too high on the page
    [800, 500, 800, 0]
  );

  return (
      <div 
        // className='grid grid-cols-[30%_70%] h-[1500px]' 
        className='grid grid-cols-[30%_70%] h-[1500px]' 
      >
        {/* Sidebar (incl. Experience Menu) */}
        <Sidebar 
          // className="sticky top-0 self-start z-[20] bg-[var(--main-blue)]" />
          className='absolute z-[20] top-[40vh]'
          scrollYProgress={scrollYProgress}
        />
        {/* <div /> */}
        <div 
          className='relative flex flex-col bg-[var(--main-beige)] text-[var(--main-red)] overflow-y-auto'
          ref={ref}
        >
          {/* overview */}
          <AnimatePresence>
            {/* {isVisible && ( */}
              <motion.section 
              // className='sticky top-[38vh] z-[10] h-[10vh] mr-[20vw]'
              className='sticky top-[0vh] z-[10] h-[10vh] mr-[20vw] ml-[5vw]'
              // className="sticky top-[10vh] z-[10] p-4 bg-[var(--overlay-bg)]"
              //   initial={{ opacity: 0, y: 25 }}
              //   whileInView={{ opacity: 1, y: 0 }}
              //   exit={{ opacity: 0, y: -80 }}
              //   transition={{ease: "easeInOut", duration: 0.2}}
              //   animate={{ opacity: 1, y: 0 }}
              //   viewport={{ once: true }}
              // >
              style={{
                // y: topTransform,
                y: translateY,
                // opacity: opacityTransform,
              }}
              >
                <p className='mb-[10px]'>{EXP_OVERVIEW.p1}</p>
                <p className='mb-[10px]'>{EXP_OVERVIEW.p2}</p>
                <p className='font-semibold italic'>{EXP_OVERVIEW.p3}</p>
            </motion.section>
            {/* )} */}
          </AnimatePresence>

          

        </div>

      </div>
  );
};

const Sidebar = ({scrollYProgress}) => {

  // const topPos = useTransform(scrollYProgress, [0, 0.1, 0.5, 1], ['50px', '300px', '550px', '1000px']);
  const topPos = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.7, 1],
    [0, 600, 1000, 1425]
  );
  const scaleValue = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.7, 1],
    [1, 1.5, 1.5, 1]
  );

  const opacityTransform = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.2, 1],
    [0, 0.5, 1, 1]
  );

  return(
    <div className="relative h-full z-20 bg-[var(--main-beige)] overflow-visible">

      {/* <div className="absolute z-10 ml-[10vw] h-[160vh] w-[4px] rounded-full bg-[var(--main-red)] text-[var(--main-red)]"> */}
      <div className="absolute z-10 ml-[10vw] h-full w-[4px] rounded-full bg-[var(--main-red)] text-[var(--main-red)]">
        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 z-10 w-4 h-4 bg-[var(--main-red)] rounded-full"
          style={{ 
            top: topPos,
            opacity: opacityTransform,
          }}  
        />
        <motion.h1 
          className='absolute text-[20px] ml-[5vw] font-bold text-[var(--main-red)]'
          style={{
            top: topPos,
            scale: scaleValue,
            opacity: opacityTransform,
            transformOrigin: "left center", // anchors scaling to the left
          }}
        >
          EXPERIENCE
        </motion.h1>

      </div>


    </div>
  )
}


export default Experience;