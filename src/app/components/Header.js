import React from 'react';
import styles from '../../../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            {/* <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><a className={styles.navLink} href="/">HOME</a></li>
                    <li className={styles.navItem}><a className={styles.navLink} href="/projects">PROJECTS</a></li>
                    <li className={styles.navItem}><a className={styles.navLink} href="/contact">CONTACT</a></li>
                </ul>
            </nav> */}
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}><a className={styles.navLink} href="/">DIANE KIM</a></li>
                    {/* <li className={styles.navItem}><a className={styles.navLink} href="/projects">PROJECTS</a></li> */}
                    <li className={styles.navItem}><a className={styles.navLink} href="/contact">THE EXTRAS</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
