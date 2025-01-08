import React from 'react';

const Button = ({text, onClick, style, link}) => {
  return (
    <div>
        <button
          onClick={onClick} 
          style={{
            ...style
          }}
          className={`flex items-center justify-center px-[15px] py-[5px] font-semibold h-[30px] border-[var(--main-red)] rounded-[15px] text-[var(--main-red)] bg-[var(--main-beige)] opacity-70 
                      lg:text-[18px] lg:border-[2px]
                      xl:text-[20px] xl:border-[2.5px] xl:whitespace-nowrap
                      hover:border-[var(--main-beige)] hover:bg-[var(--main-red)] hover:text-[var(--main-beige)] hover:opacity-100
                      focus:border-[var(--main-beige)] focus:bg-[var(--main-red)] focus:text-[var(--main-beige)] focus:opacity-100`}
        >
          {link ? <a href={link}>{text}</a> : text}
        </button>
        
    </div>
  );
};


export default Button;