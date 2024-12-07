import React from 'react';
import { EXP_BLURBS, EXP_IMPACTS, EXP_ROLES, EXP_TECHS } from '../data/ExperienceData';
import Button from './Button';
import Image from 'next/image';
import Arrow from '../../../public/Arrow.svg'

const ExpSection = ({experience}) => {

  // console.log("EXPSECTION", experience)
  
  const EXPERIENCE = "dummy_experience"
  // if X button is clicked, EXPERIENCE = ___________, render Y

  return (
    <section className='absolute w-[75%] h-[75vh] mt-[140vh] pl-[10vw] text-[var(--main-red)] bg-[var(--main-beige)]'>
      <Role experience={experience} />
      <Blurb experience={experience} />
      {/* <Impact experience={experience} /> */}
      <Projects />
    </section>
  );
};

const Role = ({experience}) => {
  return (
    <div className='relative w-full text-[30px] whitespace-nowrap'>
      <div className="flex flex-row font-semibold h-[30px] mb-[5px]">
        <h1>
          {EXP_ROLES[experience].title}
        </h1>
        <h1 className="ml-[5px] text-[var(--main-blue)]">
          @ {EXP_ROLES[experience].company}
        </h1>
      </div>
      <p className='text-[15px] italic font-semibold text-[var(--main-blue)]'>
        ({EXP_ROLES[experience].date})
      </p>

    </div>
  )
}

const Blurb = ({experience}) => {
  return (
    <div className='flex flex-col justify-center gap-y-3 mt-[5vh]'>
      {EXP_BLURBS[experience].map((paragraph) => (
        <div className='flex flex-row gap-x-5' >
          <Image src={Arrow} alt='arrow' className='w-[16px] h-[16px] mt-[2px]'/>
          <p className='leading-tight'>
            {paragraph}
          </p>
        </div>
      ))}

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
        <div className='w-full h-[3px] bg-[var(--main-red)]'/>
      </div>

      {/* map */}
      <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[15px]'>
        <li>Conducted in-depth user research to identify usability challenges and prioritized features that increased user satisfaction and engagement.</li>
        <li>Refactored the React app’s architecture, implementing modular design principles to develop a table-based layout for scalability and improved functionality.</li>
        <li>Delivered high-quality, maintainable full-stack features that optimized app performance while meeting business objectives.</li>
        <li>Collaborated with cross-functional teams to create high-fidelity Figma prototypes that balanced user needs with technical constraints.</li>
      </ul>

      {/* tidbits – links, techstack */}
      <TidBits />
    </div>
  )
}

const Projects = ({experience}) => {
  return(
    <div>
      <h1 className='font-bold text-[20px] mt-[5vh]'>PROJECTS</h1>

      {/* map */}
      <section className='mb-[30px]'>
        <div className='flex flex-row items-center justify-start gap-x-[5px] text-[var(--main-blue)] text-[25px]'>
          <h1 className='font-semibold'>Meander</h1>
          <p className='italic font-light whitespace-nowrap'>(S/S 24)</p>
          <div className='ml-[10px] w-full h-[2px] bg-[var(--main-red)] rounded-[5px]' />
        </div>
        <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[10px]'>
          <li>Conducted in-depth user research to identify usability challenges and prioritized features that increased user satisfaction and engagement.</li>
          <li>Refactored the React app’s architecture, implementing modular design principles to develop a table-based layout for scalability and improved functionality.</li>
          <li>Delivered high-quality, maintainable full-stack features that optimized app performance while meeting business objectives.</li>
          <li>Collaborated with cross-functional teams to create high-fidelity Figma prototypes that balanced user needs with technical constraints.</li>
        </ul>
      </section>

      <section className='mb-[30px]'>
        <div className='flex flex-row items-center gap-x-[5px] text-[var(--main-blue)] text-[25px]'>
          <h1 className='w-[600px] font-semibold whitespace-nowrap'>Hilltop Microfinance Initiative</h1>
          <p className='italic font-light whitespace-nowrap'>(F/W 23)</p>
          <div className='ml-[10px] flex-shrink w-full h-[2px] bg-[var(--main-red)] rounded-[5px]' />
          {/* include site link if relevant */}
          <Button 
            text={"SITE"}
            style={{
              // borderColor: 'var(--main-blue)',
              borderWidth: '2px',
              // color: 'var(--main-blue)',
              opacity: '100%',
              fontSize: '15px',
              padding: '7px',
              paddingLeft: '10px',
              paddingRight: '10px',
              marginLeft: '10px'
            }}
          />
        </div>
        <ul className='list-disc mt-[10px] ml-4 leading-tight space-y-[10px]'>
          <li>Conducted in-depth user research to identify usability challenges and prioritized features that increased user satisfaction and engagement.</li>
          <li>Refactored the React app’s architecture, implementing modular design principles to develop a table-based layout for scalability and improved functionality.</li>
          <li>Delivered high-quality, maintainable full-stack features that optimized app performance while meeting business objectives.</li>
          <li>Collaborated with cross-functional teams to create high-fidelity Figma prototypes that balanced user needs with technical constraints.</li>
        </ul>
      </section>
            
      {/* tidbits -- links, tech stack */}
      <TidBits className="relative" />
      
    </div>
  )
}

{/* <div className='absolute bottom-[10px] w-full h-[5vh] '> */}

const TidBits = ({experience}) => {
  return(
    <div 
        className='relative w-full h-[5vh] '
        style={{ marginTop: 'min(50px, 10vh)' }}
    >
        <div className='mb-[10px] h-[2px] rounded-[5px] bg-[var(--main-blue)] '/>

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
            <p>POSTGRE SQL</p>
          </div>
      </div>
  </div>
  )
}

export default ExpSection;