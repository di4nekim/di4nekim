"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import Button from "./Button";

import {
  EXP_BLURBS,
  EXPERIENCES,
  EXP_IMPACTS,
  EXP_ROLES,
  EXP_PROJECTS,
  EXP_LINKS,
  EXP_TECHS,
} from "../data/ExperienceData";
import Arrow from "../../../public/Arrow.svg";
// import Chevron from '../../../public/chevron.png';
import Chevron_red from "../../../public/chevron_red.png";
import Chevron_beige from "../../../public/chevron_beige.png";
import ExperienceCloud2 from "../../../public/experience-cloud-2.png";

const ExperienceContext = React.createContext();

const ExpSection = () => {
  const [experience, setExperience] = useState("KEEPUP");

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
          <Role experience={experience} />
          <Blurb experience={experience} />
          {(experience === "KEEPUP" ||
            experience === "HOYALYTICS" ||
            experience === "THE HOYA" ||
            experience === "HM ON TECH") && <Impact experience={experience} />}

          {experience === "HOYA DEVELOPERS" && (
            <Projects experience={experience} />
          )}
        </section>
        {/* <div className="absolute bottom-[0] z-10 ml-[10vw] h-[35vh] w-[4px] rounded-full bg-[var(--main-red)]" /> */}
      </div>
    </ExperienceContext.Provider>
  );
};

const Role = ({ experience }) => {
  return (
    <div className="relative w-full text-[23px] sm:text-[28px] md:text-[25px] lg:text-[28px] xl:text-[30px]">
      <div className="mb-[5px] flex h-[30px] flex-col font-semibold md:flex-col lg:flex-col xl:flex-row">
        <h1 className="-my-[13px] md:-my-[13px] lg:-my-[13px] xl:my-0 xl:whitespace-nowrap">
          {EXP_ROLES[experience].title}
        </h1>
        <h1 className="text-[var(--main-blue)] md:text-[22px] lg:text-[25px] xl:ml-[10px] xl:whitespace-nowrap xl:text-[30px]">
          @ {EXP_ROLES[experience].company}
        </h1>
      </div>
      <p className="absolute -top-[25px] left-0 text-[13px] font-semibold italic text-[var(--main-blue)] opacity-70 md:absolute md:-top-[25px] md:left-0 md:text-[13px] md:opacity-70 xl:relative xl:mt-[30px] xl:text-[15px] xl:opacity-100">
        ({EXP_ROLES[experience].date})
      </p>
    </div>
  );
};

const Blurb = ({ experience }) => {
  return (
    <div className="mt-[5vh] flex flex-col justify-center gap-y-3 xl:mt-[3vh]">
      {EXP_BLURBS[experience].map((paragraph, index) => (
        <div className="flex flex-row gap-x-5" key={index}>
          <Image
            src={Arrow}
            alt="arrow"
            className="mt-[2px] h-[16px] w-[16px]"
          />
          <p className="leading-tight">{paragraph}</p>
        </div>
      ))}
    </div>
  );
};

const Impact = ({ experience }) => {
  return (
    <div>
      <div className="mt-[5vh] flex flex-row items-center gap-x-3">
        <h1 className="text-[20px] font-semibold">IMPACT</h1>
        <div className="h-[3px] w-full bg-[var(--main-red)]" />
      </div>

      {EXP_IMPACTS[experience].map((paragraph, index) => (
        <ul
          className="ml-4 mt-[10px] list-disc space-y-[15px] leading-tight"
          key={index}
        >
          <li>{paragraph}</li>
        </ul>
      ))}

      {/* tidbits – links, techstack */}
      <TidBits experience={experience} />
    </div>
  );
};

const Projects = ({ experience }) => {
  return (
    <div>
      <h1 className="mt-[5vh] text-[15px] font-bold italic">PROJECTS</h1>

      {/* <p className='italic font-light whitespace-nowrap'>(S/S 24)</p> */}

      {Object.entries(EXP_PROJECTS[experience]).map(
        ([project, details], index) => (
          <section className="mb-[30px]" key={index}>
            <div className="flex flex-row items-center justify-start gap-x-[5px] text-[25px] text-[var(--main-blue)]">
              <h1 className="whitespace-nowrap font-semibold">{project}</h1>
              <div className="ml-[10px] h-[2px] w-full rounded-[5px] bg-[var(--main-red)]" />
              {details.site && (
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
                  link={details.site}
                />
              )}
            </div>
            <ul className="ml-4 mt-[10px] list-disc space-y-[10px] leading-tight">
              {details.paragraphs.map((paragraph, paragraphIndex) => (
                <li key={paragraphIndex}>{paragraph}</li>
              ))}
            </ul>
          </section>
        ),
      )}

      {/* tidbits -- links, tech stack */}
      <TidBits experience={experience} className="relative" />
    </div>
  );
};

const TidBits = ({ experience }) => {
  return (
    <div
      className="relative h-[5vh] w-full"
      style={{ marginTop: "min(50px, 10vh)" }}
    >
      <div className="mb-[10px] h-[2px] rounded-[5px] bg-[var(--main-blue)]" />

      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-x-[10px]">
          {EXP_LINKS[experience] &&
            Object.entries(EXP_LINKS[experience]).map(([name, link], index) => (
              <Button
                key={index}
                text={name}
                style={{
                  borderColor: "var(--main-blue)",
                  borderWidth: "2px",
                  color: "var(--main-blue)",
                  opacity: "100%",
                  fontSize: "18px",
                }}
                link={link}
              />
            ))}
        </div>

        <div className="ml-[5vw] flex flex-row flex-wrap justify-end gap-x-[15px] text-[15px] font-semibold italic text-[var(--main-blue)] underline md:ml-[3vw] md:text-[16px] lg:ml-[5vw] lg:text-[15px] xl:text-[18px]">
          {EXP_TECHS[experience] &&
            EXP_TECHS[experience].map((tech, index) => (
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
  const { setExperience } = React.useContext(ExperienceContext);
  const isMdOrLarger = useMediaQuery({ minWidth: 768 });

  return (
    <div className="relative z-0 h-full w-full bg-[var(--main-beige)] xl:pr-[100px]">
      {isMdOrLarger && (
        <>
          <Image
            className="md:relative md:ml-[11vw] md:mt-[5vh] md:w-[18vw] lg:relative lg:ml-[16vw] lg:mt-[5vh] lg:w-[15vw] xl:w-[200px]"
            src={ExperienceCloud2}
            alt=""
            sizes="(min-width: 1280px) 200px, (min-width: 1024px) 15vw, (min-width: 768px) 18vw, 0px"
          />
          <div className="absolute right-[100px] top-[130px] flex flex-col items-end gap-y-[20px] md:right-[11vw] md:top-[20vh] lg:right-[15vw] lg:top-[20vh] xl:right-[8vw]">
            <p className="text-[10px] font-semibold italic text-[var(--main-red)]">
              ––– 2024{" "}
            </p>
            {EXPERIENCES.map((experience, key) => (
              <Button
                key={key}
                text={experience}
                onClick={() => setExperience(experience)}
              />
            ))}
            {/* <Button 
              text={"KEEPUP"}
              onClick={() => {
                  setExperience("KEEPUP")
                }}
            />
            <Button 
              text={"HOYALYTICS"}
              onClick={() => setExperience("HOYALYTICS")}
            />
            <Button 
              text={"HOYA DEVELOPERS"}
              onClick={() => setExperience("HOYA DEVELOPERS")}
            />
            <Button 
              text={"THE HOYA"}
              onClick={() => setExperience("THE HOYA")}
            />
            <Button 
              text={"HM ON TECH"}
              onClick={() => setExperience("HM ON TECH")}
            /> */}

            <p className="text-[10px] font-semibold italic text-[var(--main-red)]">
              {" "}
              ––– 2021{" "}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const Dropdown = () => {
  const { experience, setExperience } = React.useContext(ExperienceContext);
  const [dropped, setDropped] = useState(false);
  const isSmOrSmaller = useMediaQuery({ maxWidth: 640 });

  return (
    <>
      {isSmOrSmaller && (
        <div
          className="mb-[5vh] flex w-full justify-start"
          onClick={() => {
            setDropped(!dropped);
          }}
        >
          <div className="flex flex-col">
            {dropped ? (
              <div className="mb-[15px]">
                <button
                  onClick={() => {
                    setDropped(!dropped);
                  }}
                  className={`flex h-[30px] w-full items-center justify-between rounded-[10px] border-2 border-[var(--main-red)] bg-[var(--main-red)] px-[15px] py-[5px] text-[15px] font-semibold text-[var(--main-beige)]`}
                >
                  <Image
                    src={Chevron_beige}
                    alt="chevron_beige"
                    className="mr-[3vw] mt-[2px] h-[10px] w-[16px]"
                  />
                  {experience}
                </button>
                {EXPERIENCES.map(
                  (exp, key) =>
                    exp !== experience && (
                      <div
                        key={key}
                        className="mt-[8px] flex h-[30px] flex-col items-center justify-center rounded-[5px] border-[2px] border-[var(--main-blue)] bg-[var(--main-beige)] px-[15px] font-semibold text-[var(--main-blue)] opacity-100"
                        onClick={() => setExperience(exp)}
                      >
                        {exp}
                      </div>
                    ),
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setDropped(!dropped);
                }}
                className={`flex h-[30px] items-center justify-center rounded-[10px] border-2 border-[var(--main-red)] bg-[var(--main-beige)] px-[15px] py-[5px] text-[15px] font-semibold text-[var(--main-red)] opacity-100 focus:bg-[var(--main-red)] focus:text-[var(--main-beige)]`}
              >
                <Image
                  src={Chevron_red}
                  alt="chevron_red"
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
