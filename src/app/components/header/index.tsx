"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import LocaleSwitcher from "../locale-switcher";
import { useTranslations } from "next-intl";

const Header: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const t = useTranslations("Header");

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
