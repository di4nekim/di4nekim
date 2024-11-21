'use client'
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// TO DO : insert link to gap year page later
const EDUCATION_BLURB = {
  title: "Computer Science B.Sc. & Cognitive Science Minor",
  company: "Georgetown University",
  p1: "Though I’m currently on a gap year (May ‘24 - Aug ‘25), I’m a student at Georgetown University working on my B.Sc. in Computer Science and minor in Cognitive Science.",
  p2: "There, I’ve honed my skills in advanced programming, data structures, and user-focused product development. From redesigning scalable React applications to leading high-impact projects for clients through Georgetown’s premier software development club, I thrive at the intersection of technology, design, and collaboration.",
  impact_1: "",
}

const EXP_OVERVIEW = "I’ve built full-stack applications, led cross-functional teams, and shaped product strategies to bring innovative ideas to life. Whether it’s crafting scalable platforms with React and Firebase or designing intuitive interfaces and data-driven models, I thrive on solving complex problems where technology and design meet."

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

  return (
    <div ref={parentRef} className='h-[250vh] grid grid-cols-[30%_70%]'>
      <Sidebar parentRef={parentRef} className='sticky z-[20] top-[40vh]'/>

      {/* overview */}
      <div className='relative w-full bg-[var(--main-beige)] text-[var(--main-red)] '>
        <section className='h-screen'>
          <h1 className='text-[40px] semibold mt-[30px]'>EXPERIENCE</h1>
          {EXP_OVERVIEW}
        </section>

        {/* experience section */}
        <section className='relative w-full h-[100vh] bg-[var(--main-beige)]'>
          
          <div /> {/* sidebar dummy */}
          {/* <Sidebar className='sticky z-[20] top-[40vh]'/> */}
          <section className='mt-[30vh] text-[var(--main-red)] bg-[var(--main-beige)]'>
            <h1 className='mt-[10vh] ml-[5vw] text-[var(--main-red)] bg-[var(--main-beige)] font-semibold text-[20px]'>EXPERIENCE</h1>
            <Role />
            <Blurb />

          </section>

        </section>

      </div>

    </div>
  );
};

const Sidebar = ({parentRef}) => {


  // Get scroll position relative to the parent
  const { scrollYProgress } = useScroll({
    target: parentRef, // Observe the parent container
    offset: ["start start", "end end"], // Map the start and end points of the parent
  });

  // Map scroll progress to top position
  const topPosition = useTransform(scrollYProgress, [0.56, 0.75, 1], ["13vh", "100vh", "200vh"]);
  // const topPosition = useTransform(scrollYProgress, [0.56, 0.75, 1], [13, 100, 200]);
  // const smoothTranslateY = useSpring(topPosition, { stiffness: 50, damping: 20 }); // Smooth spring animation
  // const finalTopPosition = smoothTranslateY.to((v) => `${v}vh`);


  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      console.log("Scroll Y Position:", latest); // Log scroll position
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, [scrollYProgress]);

  return(
    // <div className="relative z-10 min-h-screen bg-[var(--main-beige)]">
    <div className="relative h-full z-10 bg-[var(--main-beige)]">
      <div className="absolute z-0 ml-[10vw] h-full w-[4px] bg-[var(--main-red)]">

        {/* <motion.div 
          style={{ y: yTranslate }} 
          className="absolute top-[10vh] left-1/2 transform -translate-x-1/2 z-10 w-9 h-10 bg-[var(--main-beige)] rounded-full">
        </motion.div> */}

        <motion.div 
          className="absolute left-1/2 transform -translate-x-1/2 z-10 w-6 h-6 bg-[var(--main-red)] rounded-full"
          style={{ 
            // top: `${smoothTranslateY.get()}vh`
            top: topPosition, // Smooth translation
          }}  
        />
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