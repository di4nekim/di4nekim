import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 z-[1000] flex h-[50px] w-full items-center justify-center bg-[var(--main-red)] px-0 py-[10px] text-[15px] [font-family:var(--font-family-primary)] [font-weight:var(--font-weight-semibold)] sm:h-[65px] sm:justify-between sm:text-[20px]">
      <Link
        className="pr-[20px] text-[#F5EFE8] sm:pl-[30px]"
        href="/"
      >
        DIANE KIM
      </Link>
      <nav className="sm:pr-[20px]">
        <ul className="m-0 flex list-none justify-end p-0">
          <li className="m-0 inline-block cursor-pointer bg-no-repeat [background-image:linear-gradient(to_right,#F5EFE8,#F5EFE8)] [background-position:0_0] [background-size:3px_100%] [transition:background-size_0.2s,background-position_0.2s_0.3s] hover:[background-position:100%_0] hover:[background-size:100%_100%] sm:[background-size:5px_100%]">
            <a
              className="px-[10px] py-[5px] text-[#F5EFE8] no-underline hover:text-[var(--main-red)] sm:px-[20px] sm:py-[10px]"
              href="/resume.pdf"
              download="Diane Kim, Resume.pdf"
            >
              RESUME
            </a>
          </li>
          <li className="m-0 inline-block cursor-pointer bg-no-repeat [background-image:linear-gradient(to_right,#F5EFE8,#F5EFE8)] [background-position:0_0] [background-size:3px_100%] [transition:background-size_0.2s,background-position_0.2s_0.3s] hover:[background-position:100%_0] hover:[background-size:100%_100%] sm:[background-size:5px_100%]">
            <a
              className="px-[10px] py-[5px] text-[#F5EFE8] no-underline hover:text-[var(--main-red)] sm:px-[20px] sm:py-[10px]"
              href="https://github.com/di4nekim"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
          </li>
          <li className="m-0 inline-block cursor-pointer bg-no-repeat [background-image:linear-gradient(to_right,#F5EFE8,#F5EFE8)] [background-position:0_0] [background-size:3px_100%] [transition:background-size_0.2s,background-position_0.2s_0.3s] hover:[background-position:100%_0] hover:[background-size:100%_100%] sm:[background-size:5px_100%]">
            <a
              className="px-[10px] py-[5px] text-[#F5EFE8] no-underline hover:text-[var(--main-red)] sm:px-[20px] sm:py-[10px]"
              href="https://www.linkedin.com/in/di4nekim/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LINKEDIN
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
