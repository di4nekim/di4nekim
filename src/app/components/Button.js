"use client";
import React from "react";

const BUTTON_CLASSNAME = `flex h-[30px] items-center justify-center rounded-[15px] border-[var(--main-red)] bg-[var(--main-beige)] px-[15px] py-[5px] font-semibold text-[var(--main-red)] opacity-70 hover:border-[var(--main-beige)] hover:bg-[var(--main-red)] hover:text-[var(--main-beige)] hover:opacity-100 focus:border-[var(--main-beige)] focus:bg-[var(--main-red)] focus:text-[var(--main-beige)] focus:opacity-100 md:h-[25px] md:whitespace-nowrap md:border-[2px] md:px-[15px] md:py-[8px] md:text-[14px] lg:h-[30px] lg:border-[2px] lg:px-[15px] lg:py-[5px] lg:text-[18px] xl:whitespace-nowrap xl:border-[2.5px] xl:text-[20px]`;

const Button = ({ text, onClick, style, link, className }) => {
  const mergedClassName = className
    ? `${BUTTON_CLASSNAME} ${className}`
    : BUTTON_CLASSNAME;

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...style }}
        className={mergedClassName}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ ...style }}
      className={mergedClassName}
    >
      {text}
    </button>
  );
};

export default Button;
