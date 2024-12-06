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
  const parentRef = useRef(null);
  const { scrollY } = useScroll();
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

      {/* Menu + Sidebar */}
      {/* <section className='relative'> */}
        <Sidebar parentRef={parentRef} className='absolute z-[20] top-[40vh]'/>
      {/* </section> */}

      <div className='relative flex flex-col bg-[var(--main-beige)] text-[var(--main-red)] '>
        {/* overview */}
        <AnimatePresence>
          {isVisible && (
            <motion.section 
            className='sticky top-[50vh] z-[10] h-[10vh] mr-[20vw]'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ease: "easeInOut", duration: 0.3}}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className='mb-[10px]'>{EXP_OVERVIEW.p1}</p>
            <p className='mb-[10px]'>{EXP_OVERVIEW.p2}</p>
            <p className='font-semibold italic'>{EXP_OVERVIEW.p3}</p>
          </motion.section>
          )}
        </AnimatePresence>

        {/* experience section */}
        <ExpSection />

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
  const scaleValue = useTransform(scrollValue, [2000, 2150, 2500, 2700, 4000], [1, 2.5, 2.5, 1, 1]);
  const translateX = useTransform(scrollValue, [2000, 2150, 2500, 2700, 4000], ["5vw", "20vw", "20vw", "5vw", "5vw"]);

  useEffect(() => {
    scrollValue.set(scrollY); // Update Framer Motion's MotionValue on scroll
    console.log(scrollY);
  }, [scrollY, scrollValue]);

  return(
    <div className="relative h-full z-20 bg-[var(--main-beige)] overflow-visible">

      <div className="absolute z-10 ml-[10vw] h-full w-[4px] bg-[var(--main-red)] text-[var(--main-red)]">

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
          className='absolute text-[20px] font-bold text-[#cb0000]'
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
      
      {/* experience section menu */}
      <Menu className='' />


    </div>
  )
}

const Menu = () => {
  return(
    <div className='absolute bottom-[0vh] z-0 h-[120vh] w-full bg-[var(--main-beige)]'> 
      <Image className='absolute right-[0] top-[10%]' src={ExperienceCloud2}/>
      <div className='absolute right-[65px] top-[250px] flex flex-col gap-y-[20px] items-end'>
        <p className='text-[var(--main-red)] text-[10px] font-semibold italic'>2021 ––– </p>
        <Button text={"KEEPUP"} />
        <Button text={"HOYALYTICS"} />
        <Button text={"HOYA DEVELOPERS"} />
        <Button text={"THE HOYA"} />
        <Button text={"HM ON TECH"} />

        <p className='text-[var(--main-red)] text-[10px] font-semibold italic'> 2024 –––</p>
      </div>
    </div>
  )
}


export default Experience;