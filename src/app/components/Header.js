import React from "react";
import Link from "next/link";
import styles from "../../../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.name} href="/">
        DIANE KIM
      </Link>
      <nav className="sm:pr-[20px]">
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="/resume.pdf"
              download="Diane Kim, Resume.pdf"
            >
              RESUME
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
              href="https://github.com/di4nekim"
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              className={styles.navLink}
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
