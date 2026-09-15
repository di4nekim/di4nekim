import React from "react";

const Footer = () => {
  return (
    <footer className="flex h-10 items-center justify-center bg-mainRed text-[12px] text-mainBeige sm:h-16 sm:text-[16px]">
      <p>
        &copy; {new Date().getFullYear()} All Rights Reserved. Designed + built
        by Diane Kim.{" "}
      </p>
    </footer>
  );
};

export default Footer;
