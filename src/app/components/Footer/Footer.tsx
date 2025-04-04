"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Skeleton from "../Skeleton/Skeleton";

const Footer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Skeleton variant="large" />
          <Skeleton variant="small" />
          <Skeleton variant="large" />
        </div>
      </footer>
    );
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link
          href="https://github.com/von-Wrigley/rest-client-app"
          className={styles.link}
        >
          GitHub Link
        </Link>
        <span>&copy; {new Date().getFullYear()}</span>
        <Link
          href="https://rs.school/courses/reactjs"
          className={styles.courseLink}
        >
          <img
            src="/rss-logo.svg"
            alt="Course Logo"
            className={styles.courseLogo}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
