import React from "react";
import Link from "next/link";
import { HEADER } from "@/lib/content";
import { Reveal } from "./DiagonalReveal.js";

// Site-relative links ("/resume.pdf") are downloads; everything else is
// external and opens in a new tab.
const linkProps = (href) =>
  href.startsWith("/")
    ? { download: HEADER.resumeDownloadName }
    : { target: "_blank", rel: "noopener noreferrer" };

const Header = () => {
  return (
    <header className="fixed top-0 z-[1000] flex h-[50px] w-full items-center justify-center bg-[var(--main-red)] px-0 py-[10px] text-[15px] [font-family:var(--font-family-primary)] [font-weight:var(--font-weight-semibold)] sm:h-[65px] sm:justify-between sm:text-[20px]">
      <Reveal exitOnScroll={false} className="pr-[20px] sm:pl-[30px]">
        <Link className="text-[#F5EFE8]" href="/">
          {HEADER.name}
        </Link>
      </Reveal>
      <nav className="sm:pr-[20px]">
        <ul className="m-0 flex list-none justify-end p-0">
          {HEADER.links.map(({ label, href }) => (
            <Reveal
              as="li"
              key={label}
              exitOnScroll={false}
              className="m-0 inline-block cursor-pointer bg-no-repeat [background-image:linear-gradient(to_right,#F5EFE8,#F5EFE8)] [background-position:0_0] [background-size:3px_100%] [transition:background-size_0.2s,background-position_0.2s_0.3s] hover:[background-position:100%_0] hover:[background-size:100%_100%] sm:[background-size:5px_100%]"
            >
              <a
                className="px-[10px] py-[5px] text-[#F5EFE8] no-underline hover:text-[var(--main-red)] sm:px-[20px] sm:py-[10px]"
                href={href}
                {...linkProps(href)}
              >
                {label}
              </a>
            </Reveal>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
