import React from 'react';
import styles from '../../../styles/Header.module.css';
// import Resume from '../../../public/Diane\ Kim,\ Software\ Engineering.pdf';
// import Resume from '../../../public/resume.pdf';
const Header = () => {
    return (
        <header className={styles.header}>

            <a className={styles.name} href="/">DIANE KIM</a>
            <nav className='sm:pr-[20px]'>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><a className={styles.navLink} href="/resume.pdf" download="Diane Kim, Resume.pdf">RESUME</a></li>
                    {/* <li className={styles.navItem}><a className={styles.navLink} href="/projects">PROJECTS</a></li> */}
                    <li className={styles.navItem}><a className={styles.navLink} href="https://github.com/deadsweetpotato">GITHUB</a></li>
                    <li className={styles.navItem}><a className={styles.navLink} href="https://www.linkedin.com/in/dianeekim/">LINKEDIN</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
