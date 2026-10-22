"use client";
import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "./Button";

// Local SSR-safe useMediaQuery. Returns `null` until the first client-side
// measurement (matches the pattern in Experience.js). Callers guard with
// `matches && (...)` so `null` renders nothing on the server and before
// hydration — same effective behavior as the previous library's SSR-false
// default under an `&&` guard.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(null);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}

import { EXPERIENCE, EXPERIENCES } from "@/lib/content";
import Arrow from "../../../public/Arrow.svg";
import Chevron_red from "../../../public/chevron_red.png";
import Chevron_beige from "../../../public/chevron_beige.png";
import ExperienceCloud2 from "../../../public/experience-cloud-2.png";

const ExperienceContext = React.createContext();

const JOBS_BY_KEY = Object.fromEntries(
  EXPERIENCES.map((job) => [job.key, job]),
);

const ExpSection = () => {
  const [experience, setExperience] = useState(EXPERIENCES[0].key);
  const job = JOBS_BY_KEY[experience];

  // Memoize so consumers (Menu, Dropdown, Role, Blurb, Impact, Projects)
  // only re-render when `experience` actually changes.
  const contextValue = useMemo(
    () => ({ experience, setExperience }),
    [experience],
  );

  return (
    <ExperienceContext.Provider value={contextValue}>
      <div className="relative h-full bg-[var(--main-beige)] px-[10vw] pb-[30vh] pt-[5vh] sm:pt-[8vh] md:grid md:grid-cols-[35%_65%] md:px-0 md:pt-0 lg:grid-cols-[40%_60%] xl:grid-cols-[30%_70%]">
        <Menu />
        <section className="relative h-full bg-[var(--main-beige)] text-[var(--main-red)] md:pr-[5vw] lg:pr-[5vw] xl:px-[10vw]">
          <Dropdown />
          <Role job={job} />
          <Blurb job={job} />
          {job.impact.length > 0 && <Impact job={job} />}
          {job.projects.length > 0 && <Projects job={job} />}
        </section>
      </div>
    </ExperienceContext.Provider>
  );
};

const Role = ({ job }) => {
  return (
    <div className="relative w-full text-[23px] sm:text-[28px] md:text-[25px] lg:text-[28px] xl:text-[30px]">
      <div className="mb-[5px] flex h-[30px] flex-col font-semibold md:flex-col lg:flex-col xl:flex-row">
        <h1 className="my-[-13px] md:my-[-13px] lg:my-[-13px] xl:my-0 xl:whitespace-nowrap">
          {job.title}
        </h1>
        <h1 className="text-[var(--main-blue)] md:text-[22px] lg:text-[25px] xl:ml-[10px] xl:whitespace-nowrap xl:text-[30px]">
          @ {job.company}
        </h1>
      </div>
      <p className="absolute left-0 top-[-25px] text-[13px] font-semibold italic text-[var(--main-blue)] opacity-70 md:absolute md:left-0 md:top-[-25px] md:text-[13px] md:opacity-70 xl:relative xl:mt-[30px] xl:text-[15px] xl:opacity-100">
        ({job.dates})
      </p>
    </div>
  );
};

const Blurb = ({ job }) => {
  return (
    <div className="mt-[5vh] flex flex-col justify-center gap-y-3 xl:mt-[3vh]">
      {job.blurb.map((paragraph, index) => (
        <div className="flex flex-row gap-x-5" key={index}>
          <Image
            src={Arrow}
            alt=""
            aria-hidden="true"
            className="mt-[2px] h-[16px] w-[16px]"
          />
          <p className="leading-tight">{paragraph}</p>
        </div>
      ))}
    </div>
  );
};

const Impact = ({ job }) => {
  return (
    <div>
      <div className="mt-[5vh] flex flex-row items-center gap-x-3">
        <h1 className="text-[20px] font-semibold">
          {EXPERIENCE.impactHeading}
        </h1>
        <div className="h-[3px] w-full bg-[var(--main-red)]" />
      </div>

      {job.impact.map((paragraph, index) => (
        <ul
          className="ml-4 mt-[10px] list-disc space-y-[15px] leading-tight"
          key={index}
        >
          <li>{paragraph}</li>
        </ul>
      ))}

      {/* tidbits – links, techstack */}
      <TidBits job={job} />
    </div>
  );
};

const Projects = ({ job }) => {
  return (
    <div>
      <h1 className="mt-[5vh] text-[15px] font-bold italic">
        {EXPERIENCE.projectsHeading}
      </h1>

      {job.projects.map((project, index) => (
        <section className="mb-[30px]" key={index}>
          <div className="flex flex-row items-center justify-start gap-x-[5px] text-[25px] text-[var(--main-blue)]">
            <h1 className="whitespace-nowrap font-semibold">{project.name}</h1>
            <div className="ml-[10px] h-[2px] w-full rounded-[5px] bg-[var(--main-red)]" />
            {project.site && (
              <Button
                text={"SITE"}
                style={{
                  borderWidth: "2px",
                  opacity: "100%",
                  fontSize: "15px",
                  padding: "7px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  marginLeft: "10px",
                }}
                link={project.site}
                className="hover:!border-[var(--main-blue)] hover:!bg-[rgba(48,142,219,0.2)] hover:!text-[var(--main-blue)]"
              />
            )}
          </div>
          <ul className="ml-4 mt-[10px] list-disc space-y-[10px] leading-tight">
            {project.bullets.map((bullet, bulletIndex) => (
              <li key={bulletIndex}>{bullet}</li>
            ))}
          </ul>
        </section>
      ))}

      {/* tidbits -- links, tech stack */}
      <TidBits job={job} className="relative" />
    </div>
  );
};

const TidBits = ({ job }) => {
  return (
    <div
      className="relative h-[5vh] w-full"
      style={{ marginTop: "min(50px, 10vh)" }}
    >
      <div className="mb-[10px] h-[2px] rounded-[5px] bg-[var(--main-blue)]" />

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-x-[10px]">
          {job.links.map(({ label, href }, index) => (
            <Button
              key={index}
              text={label}
              style={{
                borderColor: "var(--main-blue)",
                borderWidth: "2px",
                color: "var(--main-blue)",
                opacity: "100%",
                fontSize: "18px",
              }}
              link={href}
              className="hover:!border-[var(--main-blue)] hover:!bg-[rgba(48,142,219,0.2)] hover:!text-[var(--main-blue)]"
            />
          ))}
        </div>

        <div className="ml-[5vw] flex flex-row flex-wrap justify-end gap-x-[15px] text-[12px] font-semibold not-italic text-[var(--main-blue)] no-underline md:ml-[3vw] md:text-[13px] lg:ml-[5vw] lg:text-[12px] xl:text-[14px]">
          {job.tech.map((tech, index) => (
            <p className="whitespace-nowrap" key={index}>
              {tech}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Menu = () => {
  const { experience, setExperience } = React.useContext(ExperienceContext);
  const isMdOrLarger = useMediaQuery("(min-width: 768px)");

  // The cloud stays put; the menu chips travel up over it with scroll.
  const menuRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: menuRef,
    offset: ["start end", "end start"],
  });
  const menuY = useTransform(scrollYProgress, [0, 1], [100, -300]);
  const menuOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <div
      ref={menuRef}
      className="relative z-0 size-full bg-[var(--main-beige)] xl:pr-[100px]"
    >
      {isMdOrLarger && (
        <>
          <Image
            className="md:relative md:ml-[11vw] md:mt-[5vh] md:w-[18vw] lg:relative lg:ml-[16vw] lg:mt-[5vh] lg:w-[15vw] xl:w-[200px]"
            src={ExperienceCloud2}
            alt=""
            sizes="(min-width: 1280px) 200px, (min-width: 1024px) 15vw, (min-width: 768px) 18vw, 0px"
          />
          <motion.div
            style={{ y: menuY, opacity: menuOpacity }}
            className="absolute right-[100px] top-[130px] flex flex-col items-end gap-y-[20px] md:right-[11vw] md:top-[20vh] lg:right-[15vw] lg:top-[20vh] xl:right-[8vw]"
          >
            <p
              className="text-[10px] font-semibold italic text-[var(--main-red)]"
              suppressHydrationWarning
            >
              {EXPERIENCE.timelineTop.replace(
                "{year}",
                String(new Date().getFullYear()),
              )}
            </p>
            {EXPERIENCES.map(({ key }) => (
              <Button
                key={key}
                text={key}
                selected={key === experience}
                onClick={() => setExperience(key)}
              />
            ))}

            <p className="text-[10px] font-semibold italic text-[var(--main-red)]">
              {EXPERIENCE.timelineBottom}
            </p>
          </motion.div>
        </>
      )}
    </div>
  );
};

const Dropdown = () => {
  const { experience, setExperience } = React.useContext(ExperienceContext);
  const [dropped, setDropped] = useState(false);
  const isSmOrSmaller = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {isSmOrSmaller && (
        <div className="mb-[5vh] flex w-full justify-start">
          <div className="flex flex-col">
            {dropped ? (
              <div className="mb-[15px]">
                <button
                  type="button"
                  onClick={() => {
                    setDropped(!dropped);
                  }}
                  aria-expanded={true}
                  aria-haspopup="listbox"
                  aria-label={`Selected experience: ${experience}. Collapse experience list.`}
                  className={`flex h-[30px] w-full items-center justify-between rounded-[10px] border-2 border-[var(--main-red)] bg-[var(--main-red)] px-[15px] py-[5px] text-[15px] font-semibold text-[var(--main-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-beige)]`}
                >
                  <Image
                    src={Chevron_beige}
                    alt=""
                    aria-hidden="true"
                    className="mr-[3vw] mt-[2px] h-[10px] w-[16px]"
                  />
                  {experience}
                </button>
                {EXPERIENCES.map(
                  ({ key: exp }) =>
                    exp !== experience && (
                      <button
                        type="button"
                        key={exp}
                        className="mt-[8px] flex h-[30px] w-full flex-col items-center justify-center rounded-[5px] border-2 border-[var(--main-blue)] bg-[var(--main-beige)] px-[15px] font-semibold text-[var(--main-blue)] opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-red)]"
                        onClick={() => {
                          setExperience(exp);
                          setDropped(false);
                        }}
                      >
                        {exp}
                      </button>
                    ),
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDropped(!dropped);
                }}
                aria-expanded={false}
                aria-haspopup="listbox"
                aria-label={`Selected experience: ${experience}. Expand experience list.`}
                className={`flex h-[30px] items-center justify-center rounded-[10px] border-2 border-[var(--main-red)] bg-[var(--main-beige)] px-[15px] py-[5px] text-[15px] font-semibold text-[var(--main-red)] opacity-100 focus:bg-[var(--main-red)] focus:text-[var(--main-beige)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-red)]`}
              >
                <Image
                  src={Chevron_red}
                  alt=""
                  aria-hidden="true"
                  className="mr-[3vw] mt-[2px] h-[10px] w-[16px]"
                />
                {experience}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExpSection;
