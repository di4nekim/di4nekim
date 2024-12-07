import React from 'react';

const Button = ({text, onClick, style, link}) => {
  return (
    <div>
        <button
          onClick={onClick} 
          style={{
            ...style
          }}
          className={`flex items-center justify-center px-[15px] py-[5px] h-[30px] border-[2.5px] border-[var(--main-red)] rounded-[15px] font-semibold text-[20px] text-[var(--main-red)] bg-[var(--main-beige)] opacity-70 focus:border-[var(--main-beige)] focus:bg-[var(--main-red)] focus:text-[var(--main-beige)] focus:opacity-100`}
        >
          {link ? <a href={link}>{text}</a> : text}
        </button>
        
    </div>
  );
};


export default Button;