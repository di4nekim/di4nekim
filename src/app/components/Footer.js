import React from "react";
import { SITE } from "@/lib/content";

const Footer = () => {
  return (
    <footer className="flex h-10 items-center justify-center bg-mainRed text-[12px] text-mainBeige sm:h-16 sm:text-[16px]">
      <p>
        &copy; {new Date().getFullYear()} {SITE.footer}
      </p>
    </footer>
  );
};

export default Footer;
