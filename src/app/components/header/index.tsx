"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "../skeleton";
import LocaleSwitcher from "../locale-switcher";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

const Header: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations("Header");

  // Simulates a 2-second loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Skeleton variant="medium" className={styles.headerSkeleton} />
          </div>
          <div className={styles.headerRight}>
            <Skeleton variant="small" className={styles.imageSkeleton} />
            <Skeleton variant="medium" className={styles.buttonSkeleton} />
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
            {t("title")}
          </Link>
        </div>
        <div className={styles.headerRight}>
          <img src="/rss-logo.svg" alt="Course Logo" />
          <LocaleSwitcher />
          <div className={styles.authLinks}>
            <Link href="/signin" className={styles.link}>
              {t("signIn")}
            </Link>
            <Link href="/signup" className={styles.link}>
              {t("signUp")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
