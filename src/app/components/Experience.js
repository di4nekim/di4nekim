"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { EXPERIENCE } from "@/lib/content";

const Experience = () => {
  // TAKE 3: ditch lenis, use useScroll's native target and offset props to dynamically preserve animation layouts despite viewport resizing
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // useEffect(() => {
  //   scrollYProgress.onChange((value) => console.log("scrollYProgress:", value));
  // }, [scrollYProgress]);

  const translateY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [680, 500, 680, 0],
  );

  const opacityContent = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25],
    [0, 0, 1],
  );

  return (
    <div className="grid h-[1500px] grid-cols-[20%_80%] md:grid-cols-[30%_70%]">
      {/* Sidebar (incl. Experience Menu) */}
      <Sidebar
        className="absolute top-[40vh] z-20"
        scrollYProgress={scrollYProgress}
      />
      {/* <div /> */}
      <div
        className="relative flex flex-col overflow-y-auto bg-[var(--main-beige)] text-[var(--main-red)]"
        ref={ref}
      >
        {/* overview */}
        <AnimatePresence>
          <motion.section
            className="sticky top-0 z-10 mr-[5vw] h-[10vh] text-[14px] leading-tight sm:mr-[10vw] sm:text-[16px] sm:leading-snug md:ml-[12vw] md:mr-[10vw] lg:sticky lg:top-0 lg:z-10 lg:ml-[5vw] lg:mr-[20vw] lg:h-[10vh]"
            style={{
              y: translateY,
              opacity: opacityContent,
            }}
          >
            {EXPERIENCE.hook.map((line, index) => (
              <p
                key={index}
                className={`text-[30px] font-semibold leading-tight ${index === 0 ? "mb-[-10px]" : "mb-[20px]"}`}
              >
                {line}
              </p>
            ))}

            <p className="font-semibold leading-tight">
              {EXPERIENCE.currentlyLabel}
            </p>
            <BulletList
              items={EXPERIENCE.currentlyBullets}
              className="mb-[10px]"
            />

            <p className="font-semibold leading-tight">
              {EXPERIENCE.previouslyLabel}
            </p>
            <BulletList
              items={EXPERIENCE.previouslyBullets}
              className="mb-[15px]"
            />

            <p className="text-[18px] font-semibold">{EXPERIENCE.leadIn}</p>
          </motion.section>
          {/* )} */}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BulletList = ({ items, className }) => (
  <ul className={className}>
    {items.map((item, index) => (
      <li key={index} className="flex">
        <span className="mr-2 shrink-0">–</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const Sidebar = ({ scrollYProgress }) => {
  // `null` sentinel means we haven't measured yet. Prevents rendering the
  // desktop branch on the server and then flashing to the mobile branch
  // after hydration (H6 in the audit).
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mediaQueryMobile = window.matchMedia("(max-width: 767px)");
    const handleMobileResize = () => setIsMobile(mediaQueryMobile.matches);

    handleMobileResize();
    mediaQueryMobile.addEventListener("change", handleMobileResize);

    return () => {
      mediaQueryMobile.removeEventListener("change", handleMobileResize);
    };
  }, []);

  const topPos = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [0, 450, 1000, 1425],
  );

  const topPosMobileSmall = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [740, 440, 740, 0],
  );

  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.2, 0.7, 1],
    [1, 1.5, 1.5, 1],
  );

  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.05, 0.2, 1],
    [0, 0.5, 1, 1],
  );

  // Wait for the first client-side measurement before committing to a
  // layout — otherwise mobile viewers see the desktop branch for a beat
  // between SSR and hydration. Return the shell so the grid column doesn't
  // collapse.
  if (isMobile === null) {
    return (
      <div className="relative z-20 h-full overflow-visible bg-[var(--main-beige)]" />
    );
  }

  return (
    <div className="relative z-20 h-full overflow-visible bg-[var(--main-beige)]">
      {isMobile ? (
        <div className="absolute z-10 ml-[10vw] h-full w-[4px] rounded-full bg-[var(--main-red)] text-[var(--main-red)]">
          <motion.div
            className="absolute left-1/2 z-10 size-4 -translate-x-1/2 transform rounded-full bg-[var(--main-red)]"
            style={{
              top: topPosMobileSmall,
              opacity: opacityTransform,
            }}
          />
          <motion.h1
            className="absolute ml-[10vw] text-[25px] font-bold text-[var(--main-red)] sm:text-[30px]"
            style={{
              top: topPosMobileSmall,
              opacity: opacityTransform,
            }}
          >
            {EXPERIENCE.sidebarLabel}
          </motion.h1>
        </div>
      ) : (
        <div className="absolute z-10 ml-[10vw] h-full w-[4px] rounded-full bg-[var(--main-red)] text-[var(--main-red)]">
          <motion.div
            className="absolute left-1/2 z-10 size-4 -translate-x-1/2 transform rounded-full bg-[var(--main-red)]"
            style={{
              top: topPos,
              opacity: opacityTransform,
            }}
          />
          <motion.h1
            className="absolute ml-[5vw] text-[20px] font-bold text-[var(--main-red)] md:text-[18px] lg:text-[20px]"
            style={{
              top: topPos,
              scale: scaleValue,
              opacity: opacityTransform,
              transformOrigin: "left center", // anchors scaling to the left
            }}
          >
            {EXPERIENCE.sidebarLabel}
          </motion.h1>
        </div>
      )}
    </div>
  );
};

export default Experience;
