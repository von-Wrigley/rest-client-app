"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Note: uncomment to make an error when you scroll down the page and header become sticky, can be achieved via dding more content to the page and scrolling down

  // if (isSticky) {
  //   throw new Error("Test error from Header component");
  // }
  return (
    <header
      data-testid="header"
      className={`${styles.header} ${isSticky ? styles.sticky : ""}`}
    >
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            Postman Clone
          </Link>
        </div>
        <div className={styles.headerRight}>
          <img src="/rss-logo.svg" alt="Course Logo" />
          <button className={styles.langToggle}>EN</button>
          <div className={styles.authLinks}>
            <Link href="/signin" className={styles.link}>
              Sign In
            </Link>
            <Link href="/signup" className={styles.link}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
