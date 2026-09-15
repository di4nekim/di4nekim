import React from "react";

const Button = ({ text, onClick, style, link }) => {
  return (
    <div>
      <button
        onClick={onClick}
        style={{ ...style }}
        className={`flex h-[30px] items-center justify-center rounded-[15px] border-[var(--main-red)] bg-[var(--main-beige)] px-[15px] py-[5px] font-semibold text-[var(--main-red)] opacity-70 hover:border-[var(--main-beige)] hover:bg-[var(--main-red)] hover:text-[var(--main-beige)] hover:opacity-100 focus:border-[var(--main-beige)] focus:bg-[var(--main-red)] focus:text-[var(--main-beige)] focus:opacity-100 md:h-[25px] md:whitespace-nowrap md:border-[2px] md:px-[15px] md:py-[8px] md:text-[14px] lg:h-[30px] lg:border-[2px] lg:px-[15px] lg:py-[5px] lg:text-[18px] xl:whitespace-nowrap xl:border-[2.5px] xl:text-[20px]`}
      >
        {link ? <a href={link}>{text}</a> : text}
      </button>
    </div>
  );
};

export default Button;
