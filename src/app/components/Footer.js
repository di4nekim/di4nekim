import React from 'react';

const Footer = () => {
  return (
    <footer
      className='flex justify-center items-center h-16 bg-mainRed text-mainBeige'
    >
      <p>&copy; {new Date().getFullYear()} All Rights Reserved. Built + designed by Diane Kim. </p>
    </footer>
  );
};

export default Footer;