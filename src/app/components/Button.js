"use client";
import React from "react";

// opacity-85 (not 70) so red-on-beige effective text hits ~4.61:1
// against the beige page background — passes WCAG AA (M11 audit fix).
const SELECTED_CLASSNAME =
  "!border-[var(--main-beige)] !bg-[var(--main-red)] !text-[var(--main-beige)] !opacity-100";

const BUTTON_CLASSNAME = `flex h-[30px] items-center justify-center rounded-[15px] border-[var(--main-red)] bg-[var(--main-beige)] px-[15px] py-[5px] font-semibold text-[var(--main-red)] opacity-85 hover:border-[var(--main-beige)] hover:bg-[var(--main-red)] hover:text-[var(--main-beige)] hover:opacity-100 focus:border-[var(--main-beige)] focus:bg-[var(--main-red)] focus:text-[var(--main-beige)] focus:opacity-100 md:h-[25px] md:whitespace-nowrap md:border-[2px] md:px-[15px] md:py-[8px] md:text-[14px] lg:h-[30px] lg:border-[2px] lg:px-[15px] lg:py-[5px] lg:text-[18px] xl:whitespace-nowrap xl:border-[2.5px] xl:text-[20px]`;

const Button = ({ text, onClick, style, link, className, selected }) => {
  const mergedClassName = [
    BUTTON_CLASSNAME,
    className,
    selected && SELECTED_CLASSNAME,
  ]
    .filter(Boolean)
    .join(" ");

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
      aria-pressed={selected === undefined ? undefined : selected}
      style={{ ...style }}
      className={mergedClassName}
    >
      {text}
    </button>
  );
};

export default Button;
