'use client'
import React from 'react';

// DEPRECATED

const Sidebar = () => {
  return (
    <div className="relative w-[15vw] z-10 min-h-screen bg-[var(--main-red)]">
      <div className="absolute z-0 top-[70vh] ml-[10vw] h-[200vh] w-[4px] bg-[var(--main-beige)]">
        <div className="absolute -top-[40px] left-1/2 transform -translate-x-1/2 z-10 w-5 h-5 bg-[var(--main-beige)] rounded-full"></div>
        <div className="absolute -top-[10px] left-1/2 transform -translate-x-1/2 z-10 w-5 h-5 bg-[var(--main-beige)] rounded-full"></div>
        
        <ul className='w-[15vw] ml-[30px] mt-[60px] text-[20px] text-[var(--main-beige)] font-semibold'>
          <li>HELLO</li>
          <li className="opacity-60">ABOUT</li>
          <li className="opacity-60">EXPERIENCE</li>
          <li className="opacity-60">GET IN TOUCH</li>
        </ul>

        <div className="absolute top-[123vh] left-1/2 transform -translate-x-1/2 z-10 w-9 h-10 bg-[var(--main-red)] rounded-full"></div>
        <div className="absolute top-[124vh] left-1/2 transform -translate-x-1/2 z-10 w-6 h-6 bg-[var(--main-beige)] rounded-full"></div>

      </div>

    </div>
  );
};

export default Sidebar;