'use client'

import { motion } from 'framer-motion'

export default function ProjectItem({ title, description, image, technologies = [], link, year, id, onProjectClick, isNavigating }) {
  const handleClick = () => {
    if (onProjectClick) {
      onProjectClick()
    }
  }

  return (
    <motion.div 
      className="flex items-start gap-8 py-8 w-[50vw] justify-center items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleClick}
      animate={isNavigating ? { x: -1200, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Left side - Project name and year */}
      <div className="flex-shrink-0 w-60 flex flex-row">
        {/* Year container - takes up left portion */}
        <div className="flex-1 flex justify-end items-end">
          <span className="text-lg text-[#CB0000] italic">
             (&apos;{year || '24'})
          </span>
        </div>
        
        {/* Title container - takes up right portion */}
        <div className="ml-4 flex flex-col justify-center items-center text-[#CB0000] align-bottom">
          <div className="text-right">
            {/* Split title into words and display each on a new line */}
            {(title || "Dead Sweet Potato").split(' ').map((word, index) => (
              <div key={index} className="text-4xl font-medium italic leading-tight">
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="w-[2px] bg-[#CB0000] self-stretch flex-shrink-0"></div>

      {/* Right side - Description and details */}
      <div className="flex-1 pt-2">
        <p className="text-lg text-[#CB0000] leading-tight italic mb-6">
          {/* {description} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        </p>
        
        {/* {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[#CB0000] text-[#CB0000] rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        )} */}

        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 hover:text-blue-800 underline transition-colors"
          >
            View Project →
          </a>
        )}
      </div>
    </motion.div>
  )
}
