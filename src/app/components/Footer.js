import React from 'react';

const Footer = () => {
  return (
    <footer
      className='flex justify-center items-center h-10 sm:h-16 bg-mainRed text-mainBeige text-[12px] sm:text-[16px]'
    >
      <p>&copy; {new Date().getFullYear()} All Rights Reserved. Designed + built by Diane Kim. </p>
    </footer>
  );
};

export default Footer;