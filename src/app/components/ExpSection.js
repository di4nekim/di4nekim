'use client'
import React, {useState} from 'react';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import Button from './Button';

import { EXP_BLURBS, EXPERIENCES, EXP_IMPACTS, EXP_ROLES, EXP_PROJECTS, EXP_LINKS, EXP_TECHS } from '../data/ExperienceData';
import Arrow from '../../../public/Arrow.svg'
// import Chevron from '../../../public/chevron.png';
import Chevron_red from '../../../public/chevron_red.png';
import Chevron_beige from '../../../public/chevron_beige.png';
import ExperienceCloud2 from '../../../public/experience-cloud-2.png';


const ExperienceContext = React.createContext();

const ExpSection = () => {
  const [experience, setExperience] = useState("KEEPUP");

  return (
    <ExperienceContext.Provider value={{ experience, setExperience }}>
      <div className='relative h-full pb-[30vh] bg-[var(--main-beige)] pt-[5vh] px-[10vw]
                      sm:pt-[8vh]
                      md:grid md:grid-cols-[35%_65%] md:pt-0 md:px-0
                      lg:grid-cols-[40%_60%]
                      xl:grid-cols-[30%_70%]
                      '>
        <Menu />
        <section className='relative h-full text-[var(--main-red)] bg-[var(--main-beige)]
                            md:pr-[5vw]
                            lg:pr-[5vw]
                            xl:px-[10vw]
                            '>
          <Dropdown />
          <Role experience={experience} />
          <Blurb experience={experience} />
          {(experience === "KEEPUP" || 
            experience === "HOYALYTICS" || 
            experience === "THE HOYA" ||
            experience === "HM ON TECH") 
            && <Impact experience={experience} />}
          
          {(experience === "HOYA DEVELOPERS") 
            && <Projects experience={experience} />}
        </section>
        {/* <div className="absolute bottom-[0] z-10 ml-[10vw] h-[35vh] w-[4px] rounded-full bg-[var(--main-red)]" /> */}
      </div>
    </ExperienceContext.Provider>

  );
};

const Role = ({experience}) => {
  return (
    <div className='relative w-full text-[23px]
                    sm:text-[28px]
                    md:text-[25px]
                    lg:text-[28px]
                    xl:text-[30px]
                    '>
      <div className="flex font-semibold h-[30px] mb-[5px] flex-col
                      md:flex-col
                      lg:flex-col
                      xl:flex-row 
                      ">
        <h1 className='-my-[13px]
                      md:-my-[13px]
                      lg:-my-[13px]
                      xl:my-0  xl:whitespace-nowrap
                      '>
          {EXP_ROLES[experience].title}
        </h1>
        <h1 className="text-[var(--main-blue)] 
                      md:text-[22px]
                      lg:text-[25px]
                      xl:whitespace-nowrap xl:ml-[10px] xl:text-[30px]
                      ">
          @ {EXP_ROLES[experience].company}
        </h1>
      </div>
      <p className='absolute italic font-semibold text-[var(--main-blue)] -top-[25px] left-0 opacity-70 text-[13px]
                    md:absolute md:-top-[25px] md:left-0 md:opacity-70 md:text-[13px]
                    xl:text-[15px]  xl:opacity-100 xl:relative xl:mt-[30px]
                    '>
        ({EXP_ROLES[experience].date})
      </p>

    </div>
  )
}

const Blurb = ({experience}) => {
  return (
    <div className='flex flex-col justify-center gap-y-3 mt-[5vh]
                    xl:mt-[3vh]'>
      {EXP_BLURBS[experience].map((paragraph, index) => (
        <div className='flex flex-row gap-x-5' key={index}>
          <Image src={Arrow} alt='arrow' className='w-[16px] h-[16px] mt-[2px]'/>
          <p className='leading-tight'>
            {paragraph}
          </p>
        </div>
      ))}
    
    </div>
  )
}

const Impact = ({experience}) => {
  return(
    <div>
      <div className='flex flex-row items-center gap-x-3 mt-[5vh]'>
        <h1 className='font-semibold text-[20px]'>IMPACT</h1>
        <div className='w-full h-[3px] bg-[var(--main-red)]'/>
      </div>

      {EXP_IMPACTS[experience].map((paragraph, index) => (
        <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[15px]' key={index}>
          <li>{paragraph}</li>
        </ul>
      ))}

      {/* tidbits – links, techstack */}
      <TidBits experience={experience}/>
    </div>
  )
}

const Projects = ({experience}) => {
  return(
    <div>
      <h1 className='font-bold italic text-[15px] mt-[5vh]'>PROJECTS</h1>

      {/* <p className='italic font-light whitespace-nowrap'>(S/S 24)</p> */}

      {Object.entries(EXP_PROJECTS[experience]).map(([project, details], index) => (
        <section className='mb-[30px]' key={index}>
          <div className='flex flex-row items-center justify-start gap-x-[5px] text-[var(--main-blue)] text-[25px]'>
            <h1 className='font-semibold whitespace-nowrap'>{project}</h1>
            <div className='ml-[10px] w-full h-[2px] bg-[var(--main-red)] rounded-[5px]' />
            {details.site && <Button 
              text={"SITE"}
              style={{
                borderWidth: '2px',
                opacity: '100%',
                fontSize: '15px',
                padding: '7px',
                paddingLeft: '10px',
                paddingRight: '10px',
                marginLeft: '10px'
              }}
              link={details.site}
            />}
          </div>
          <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[10px]'>
          {details.paragraphs.map((paragraph, paragraphIndex) => (
            <li key={paragraphIndex}>{paragraph}</li>
          ))}
          </ul>

        </section>
      ))}
            
      {/* tidbits -- links, tech stack */}
      <TidBits experience={experience} className="relative" />
      
    </div>
  )
}

const TidBits = ({experience}) => {
  return(
    <div 
        className='relative w-full h-[5vh] '
        style={{ marginTop: 'min(50px, 10vh)' }}
    >
        <div className='mb-[10px] h-[2px] rounded-[5px] bg-[var(--main-blue)] '/>

        <div className='flex flex-row justify-between'>
          <div className='flex flex-row gap-x-[10px]'>
            {EXP_LINKS[experience] && Object.entries(EXP_LINKS[experience]).map(([name, link], index) => (
              <Button 
              key={index}
              text={name} 
              style={{
                borderColor: 'var(--main-blue)',
                borderWidth: '2px',
                color: 'var(--main-blue)',
                opacity: '100%',
                fontSize: '18px'
              }}
              link={link}
            />
            ))}
          </div>

          <div className='flex flex-row flex-wrap justify-end gap-x-[15px] text-[var(--main-blue)] font-semibold italic underline 
                          text-[15px] ml-[5vw] 
                          md:text-[16px] md:ml-[3vw] 
                          lg:text-[15px] lg:ml-[5vw] 
                          xl:text-[18px] 
                          '>
            {EXP_TECHS[experience] && EXP_TECHS[experience].map((tech, index) => (
              <p className='whitespace-nowrap' key={index}>{tech}</p>
            ))}
          </div>
      </div>
  </div>
  )
}

const Menu = () => {
  const { experience, setExperience } = React.useContext(ExperienceContext);
  const isMdOrLarger = useMediaQuery({ minWidth: 768 });

  return(
    <div className='relative z-0 h-full w-full bg-[var(--main-beige)]
                    xl:pr-[100px] 
                    '> 
      {isMdOrLarger && (
        <>
          <Image className='md:relative md:w-[18vw] md:ml-[11vw] md:mt-[5vh] 
                            lg:relative lg:ml-[16vw] lg:mt-[5vh] lg:w-[15vw]
                            xl:w-[200px] 
                            ' src={ExperienceCloud2} alt={"ExperienceCloud2"}/>
          <div className='absolute right-[100px] top-[130px]
                          md:right-[11vw] md:top-[20vh]
                          lg:right-[15vw] lg:top-[20vh]
                          xl:right-[8vw]
                          flex flex-col gap-y-[20px] items-end'>
            <p className='text-[var(--main-red)] text-[10px] font-semibold italic'>––– 2024  </p>
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

            <p className='text-[var(--main-red)] text-[10px] font-semibold italic'> ––– 2021 </p>
          </div>  
        </>
      )}
    </div>
  )
}

const Dropdown = () => {
  const { experience, setExperience } = React.useContext(ExperienceContext);
  const [ dropped, setDropped ] = useState(false); 
  const isSmOrSmaller = useMediaQuery({ maxWidth: 640 });

  return(
    <>
    {isSmOrSmaller && (
      <div 
        className='flex w-full justify-start mb-[5vh]'
        onClick={() => {
          setDropped(!dropped)
        }}
      >
        <div className='flex flex-col'>
          {dropped ? (
            <div className='mb-[15px]'>
              <button
              onClick={() => {
                setDropped(!dropped)
              }}
              className={`flex items-center justify-between h-[30px] px-[15px] py-[5px] w-full
                          font-semibold  border-[var(--main-red)] rounded-[10px] border-2 text-[15px]
                          bg-[var(--main-red)] text-[var(--main-beige)]`}
              >
                <Image src={Chevron_beige} alt='chevron_beige' className='w-[16px] h-[10px] mt-[2px] mr-[3vw]'/>
                {experience}
              </button>
              {EXPERIENCES.map((exp, key) => (
                exp !== experience && (
                  <div
                    key={key}
                    className='flex flex-col items-center justify-center px-[15px] h-[30px] font-semibold mt-[8px] rounded-[5px]
                              border-[2px] border-[var(--main-blue)] text-[var(--main-blue)] opacity-100 bg-[var(--main-beige)]'
                    onClick={() => setExperience(exp)}
                  >
                    {exp}
                  </div>
              )))}
            </div>
          ) : (
            <button
              onClick={() => {
                setDropped(!dropped)
              }}
              className={`flex items-center justify-center h-[30px] px-[15px] py-[5px]
                          font-semibold  border-[var(--main-red)] rounded-[10px] text-[var(--main-red)] bg-[var(--main-beige)] opacity-100 border-2 text-[15px]
                          focus:bg-[var(--main-red)] focus:text-[var(--main-beige)]`}
              >
                <Image src={Chevron_red} alt='chevron_red' className='w-[16px] h-[10px] mt-[2px] mr-[3vw]'/>
                {experience}
              </button>
          )}
          
        </div>
      </div>
    )}
    </>
  )
}

export default ExpSection;