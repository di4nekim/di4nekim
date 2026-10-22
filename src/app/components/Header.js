import React from "react";
import Link from "next/link";
import { HEADER } from "@/lib/content";
import { Reveal } from "./DiagonalReveal.js";

// Site-relative links are pages ("/projects") unless they name a file
// ("/resume.pdf"), which downloads. "#" placeholders stay in place.
// Everything else is external and opens in a new tab.
const isPage = (href) => href.startsWith("/") && !/\.\w+$/.test(href);

const linkProps = (href) =>
  href.startsWith("#")
    ? {}
    : href.startsWith("/")
      ? { download: HEADER.resumeDownloadName }
      : { target: "_blank", rel: "noopener noreferrer" };

const NavLink = ({ href, ...props }) =>
  isPage(href) ? (
    <Link href={href} {...props} />
  ) : (
    <a href={href} {...linkProps(href)} {...props} />
  );

const Header = ({ variant = "main" }) => {
  const links =
    variant === "after-hours" ? HEADER.afterHoursLinks : HEADER.links;
  return (
    <header className="fixed top-0 z-[1000] flex h-[50px] w-full items-center justify-center bg-[var(--main-red)] px-0 py-[10px] text-[15px] [font-family:var(--font-family-primary)] [font-weight:var(--font-weight-semibold)] sm:h-[65px] sm:justify-between sm:text-[20px]">
      <Reveal exitOnScroll={false} className="pr-[20px] sm:pl-[30px]">
        <Link className="text-[#F5EFE8]" href="/">
          {HEADER.name}
        </Link>
      </Reveal>
      <nav className="sm:pr-[20px]">
        <ul className="m-0 flex list-none justify-end p-0">
          {links.map(({ label, href, hoverText }) => (
            <Reveal
              as="li"
              key={label}
              exitOnScroll={false}
              className="group relative m-0 inline-block cursor-pointer bg-no-repeat [background-image:linear-gradient(to_right,#F5EFE8,#F5EFE8)] [background-position:0_0] [background-size:3px_100%] [transition:background-size_0.2s,background-position_0.2s_0.3s] hover:[background-position:100%_0] hover:[background-size:100%_100%] sm:[background-size:5px_100%]"
            >
              <NavLink
                className="px-[10px] py-[5px] text-[#F5EFE8] no-underline hover:text-[var(--main-red)] sm:px-[20px] sm:py-[10px]"
                href={href}
              >
                {hoverText ? (
                  // On hover, hoverText scrolls inside the label's own width.
                  <span className="relative inline-block overflow-hidden align-bottom">
                    <span className="group-hover:invisible">{label}</span>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 hidden whitespace-nowrap group-hover:flex group-hover:animate-marquee"
                    >
                      <span className="whitespace-pre">{`${hoverText} `}</span>
                      <span className="whitespace-pre">{`${hoverText} `}</span>
                    </span>
                  </span>
                ) : (
                  label
                )}
              </NavLink>
            </Reveal>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
