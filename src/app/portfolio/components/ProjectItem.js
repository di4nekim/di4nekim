"use client";

import { motion } from "framer-motion";

export default function ProjectItem({
  title,
  description,
  link,
  year,
  onProjectClick,
  isNavigating,
}) {
  const handleClick = () => {
    if (onProjectClick) {
      onProjectClick();
    }
  };

  return (
    <motion.div
      className="flex w-[50vw] cursor-pointer items-center justify-center gap-8 py-8 transition-opacity hover:opacity-80"
      onClick={handleClick}
      animate={isNavigating ? { x: -1200, opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Left side - Project name and year */}
      <div className="flex w-60 shrink-0 flex-row">
        {/* Year container - takes up left portion */}
        <div className="flex flex-1 items-end justify-end">
          <span className="text-lg italic text-[#CB0000]">
            (&apos;{year || "24"})
          </span>
        </div>

        {/* Title container - takes up right portion */}
        <div className="ml-4 flex flex-col items-center justify-center align-bottom text-[#CB0000]">
          <div className="text-right">
            {/* Split title into words and display each on a new line */}
            {(title || "Dead Sweet Potato").split(" ").map((word, index) => (
              <div
                key={index}
                className="text-4xl font-medium italic leading-tight"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical divider */}
      <div className="w-[2px] shrink-0 self-stretch bg-[#CB0000]"></div>

      {/* Right side - Description and details */}
      <div className="flex-1 pt-2">
        <p className="mb-6 text-lg italic leading-tight text-[#CB0000]">
          {description}
        </p>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-blue-600 underline transition-colors hover:text-blue-800"
          >
            View Project →
          </a>
        )}
      </div>
    </motion.div>
  );
}
