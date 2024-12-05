import React from 'react';
import { EXP_BLURBS, EXP_IMPACTS, EXP_ROLES, EXP_TECHS } from '../data/ExperienceData';
import Button from './Button';
import Image from 'next/image';
import Arrow from '../../../public/Arrow.svg'

const ExpSection = ({experience}) => {
  
  const EXPERIENCE = "dummy_experience"
  // if X button is clicked, EXPERIENCE = ___________, render Y
  

  return (
    <section className='absolute w-[70%] h-[100vh] mt-[140vh] pl-[10vw] text-[var(--main-red)] bg-[var(--main-beige)]'>
      <Role experience={experience} />
      <Blurb experience={experience} />
      <Impact experience={experience} />
      {/* <Projects /> */}
    </section>
  );
};

const Role = ({experience}) => {
  return (
    <div className='relative w-full text-[30px]'>
      <div className='flex flex-row font-semibold h-[30px] mb-[5px]'>
        <h1>
          {/* {title}  */}
          INTERN
        </h1>
        <h1 className='ml-[5px] text-[var(--main-blue)]'>
          {/* @ {company} */}
          @ KEEPUP TECHNOLOGIES
        </h1>
      </div>
      <p className='text-[15px] italic font-semibold text-[var(--main-blue)]'>
        {/* {date} */}
        (MAY '24 - DEC '24)
      </p>

    </div>
  )
}

const Blurb = ({experience}) => {
  return (
    <div className='flex flex-col justify-center gap-y-3 mt-[5vh]'>
      {/* map each paragraph to: */}

      {/* p1 */}
      <div className='flex flex-row gap-x-5'>
        <Image src={Arrow} alt='arrow' className='w-[16px] h-[16px] mt-[2px]'/>
        <p className='leading-tight'>
          As a <span className='font-bold'>Product Management</span> and <span className='font-bold'>Software Engineering</span> Intern at KeepUp, I combined technical expertise and user research to redesign and scale the company’s React-based MVP. By collaborating with stakeholders, I developed user-focused prototypes and delivered features that enhanced usability, performance, and maintainability.
        </p>
      </div>
      
      
      {/* p2 */}
      {/* <div className='flex flex-row gap-x-5 mr-[25vw]'>
        <Image src={Arrow} alt='arrow' className='w-[16px] h-[16px] mt-[2px]'/>
        <p className='leading-tight'>
          Though I’m currently on a gap year (May ‘24 - Aug ‘25), I’m a student at Georgetown University working on my B.Sc. in Computer Science and minor in Cognitive Science.
        </p>
      </div> */}
    
    </div>
  )
}

const Impact = ({experience}) => {
  return(
    <div>
      <div className='flex flex-row items-center gap-x-3 mt-[5vh]'>
        <h1 className='font-semibold text-[20px]'>IMPACT</h1>
        <div className='w-full h-[2px] bg-[var(--main-red)]'/>
      </div>

      {/* map */}
      <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[15px]'>
        <li>Conducted in-depth user research to identify usability challenges and prioritized features that increased user satisfaction and engagement.</li>
        <li>Refactored the React app’s architecture, implementing modular design principles to develop a table-based layout for scalability and improved functionality.</li>
        <li>Delivered high-quality, maintainable full-stack features that optimized app performance while meeting business objectives.</li>
        <li>Collaborated with cross-functional teams to create high-fidelity Figma prototypes that balanced user needs with technical constraints.</li>
      </ul>

      {/* tidbits – links, techstack */}

      <div className='mt-[3vh] w-full h-[5vh] '>
      <div className='mb-[5vh] h-[2px] rounded-[5px] bg-[var(--main-red)] '/>

      <div className='flex flex-row justify-start '>
        <div className='flex flex-row gap-x-[10px]'>
          <Button 
            text={"SITE"} 
            style={{
              borderColor: 'var(--main-blue)',
              borderWidth: '2px',
              color: 'var(--main-blue)',
              opacity: '100%',
              fontSize: '18px'
            }}
          />
          <Button 
            text={"GITHUB"}
            style={{
              borderColor: 'var(--main-blue)',
              borderWidth: '2px',
              color: 'var(--main-blue)',
              opacity: '100%',
              fontSize: '18px'
            }}
          />
        </div>

        <div className='ml-auto flex flex-row justify-end gap-x-[15px] text-[var(--main-blue)] text-[18px] font-semibold italic underline'>
          <p>REACT.JS</p>
          <p>NEXT.JS</p>
          <p>TAILWIND CSS</p>
        </div>
      </div>
    </div>

    </div>
  )
}

const Projects = ({experience}) => {
  return(
    <div>
      <div className='flex flex-row items-center gap-x-3 mt-[5vh]'>
        <h1 className='font-semibold text-[20px]'>PROJECTS</h1>
        <div className='w-full h-[3px] bg-[var(--main-red)]'/>
      </div>

      {/* map */}
      <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[15px]'>
        <li>Conducted in-depth user research to identify usability challenges and prioritized features that increased user satisfaction and engagement.</li>
        <li>Refactored the React app’s architecture, implementing modular design principles to develop a table-based layout for scalability and improved functionality.</li>
        <li>Delivered high-quality, maintainable full-stack features that optimized app performance while meeting business objectives.</li>
        <li>Collaborated with cross-functional teams to create high-fidelity Figma prototypes that balanced user needs with technical constraints.</li>
      </ul>
    </div>
  )
}

export default ExpSection;