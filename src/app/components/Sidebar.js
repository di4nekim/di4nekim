"use client";
import React from "react";

// DEPRECATED

const Sidebar = () => {
  return (
    <div className="relative z-10 min-h-screen w-[15vw] bg-[var(--main-red)]">
      <div className="absolute top-[70vh] z-0 ml-[10vw] h-[200vh] w-[4px] bg-[var(--main-beige)]">
        <div className="absolute -top-[40px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)]"></div>
        <div className="absolute -top-[10px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)]"></div>

        <ul className="ml-[30px] mt-[60px] w-[15vw] text-[20px] font-semibold text-[var(--main-beige)]">
          <li>HELLO</li>
          <li className="opacity-60">ABOUT</li>
          <li className="opacity-60">EXPERIENCE</li>
          <li className="opacity-60">GET IN TOUCH</li>
        </ul>

        <div className="absolute left-1/2 top-[123vh] z-10 h-10 w-9 -translate-x-1/2 transform rounded-full bg-[var(--main-red)]"></div>
        <div className="absolute left-1/2 top-[124vh] z-10 h-6 w-6 -translate-x-1/2 transform rounded-full bg-[var(--main-beige)]"></div>
      </div>
    </div>
  );
};

export default Sidebar;
