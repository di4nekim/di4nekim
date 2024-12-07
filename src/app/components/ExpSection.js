import React from 'react';
import { EXP_BLURBS, EXP_IMPACTS, EXP_ROLES, EXP_PROJECTS, EXP_LINKS, EXP_TECHS } from '../data/ExperienceData';
import Button from './Button';
import Image from 'next/image';
import Arrow from '../../../public/Arrow.svg'

const ExpSection = ({experience}) => {

  // console.log("EXPSECTION", experience)

  return (
    <section className='absolute w-[75%] h-[75vh] mt-[140vh] pl-[10vw] text-[var(--main-red)] bg-[var(--main-beige)]'>
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
      {EXP_BLURBS[experience].map((paragraph, index) => (
        <div className='flex flex-row gap-x-5' key={index}>
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
      <h1 className='font-bold text-[20px] mt-[5vh]'>PROJECTS</h1>

      {/* map */}
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

          <div className='ml-auto flex flex-row justify-end gap-x-[15px] text-[var(--main-blue)] text-[18px] font-semibold italic underline'>
            {EXP_TECHS[experience] && EXP_TECHS[experience].map((tech, index) => (
              <p key={index}>{tech}</p>
            ))}
          </div>
      </div>
  </div>
  )
}

export default ExpSection;