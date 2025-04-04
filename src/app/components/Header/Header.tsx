"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "../Skeleton/Skeleton";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  // Simulates a loading delay (for example, while fetching user data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Adds scroll event listener for sticky behavior after loading is complete
  useEffect(() => {
    if (!isLoading) {
      const handleScroll = () => {
        setIsSticky(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Skeleton variant="medium" className={styles.headerSkeleton} />
          </div>
          <div className={styles.headerRight}>
            <Skeleton variant="small" className={styles.imageSkeleton} />
            <Skeleton variant="small" className={styles.buttonSkeleton} />
            <div className={styles.authLinks}>
              <Skeleton variant="small" className={styles.linkSkeleton} />
              <Skeleton variant="small" className={styles.linkSkeleton} />
            </div>
          </div>
        </div>
      </header>
    );
  }

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
