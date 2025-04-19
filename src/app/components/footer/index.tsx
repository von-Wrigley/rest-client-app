"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Skeleton from "../skeleton";
import styles from "./index.module.scss";

const Footer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("Footer");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const githubLinks = [
    { href: "https://github.com/lionna", label: t("github1") },
    { href: "https://github.com/von-Wrigley", label: t("github2") },
    { href: "https://github.com/CROCIATOFAF", label: t("github3") },
  ];

  if (isLoading) {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Skeleton variant="medium" className={styles.skeletonLink} />
          <Skeleton variant="medium" className={styles.skeletonLink} />
          <Skeleton variant="medium" className={styles.skeletonLink} />
          <Skeleton variant="small" className={styles.skeletonText} />
          <Skeleton variant="small" className={styles.skeletonImage} />
        </div>
      </footer>
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {githubLinks.map((link, index) => (
          <Link key={index} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
        <span>&copy; 2025</span>
        <Link
          href="https://rs.school/courses/reactjs"
          className={styles.courseLink}
        >
          <img
            src="/rss-logo.svg"
            alt={t("courseAlt")}
            className={styles.courseLogo}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
