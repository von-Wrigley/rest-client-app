"use client";

import { useState, useEffect } from "react";
import Skeleton from "./components/Skeleton/Skeleton";
import Link from "next/link";
import styles from "./page.module.scss";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulates a loading delay for the Home page
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.welcome}>
        <Skeleton variant="large" className={styles.titleSkeleton} />
        <Skeleton variant="medium" className={styles.descriptionSkeleton} />
        <div className={styles.authButtons}>
          <Skeleton variant="small" className={styles.buttonSkeleton} />
          <Skeleton variant="small" className={styles.buttonSkeleton} />
        </div>
      </section>
    );
  }
  return (
    <section className={styles.welcome}>
      <h2 className={styles.title}>Welcome!</h2>
      <p className={styles.description}>
        This REST client application allows you to test any API, manage request
        history, and work with variables.
      </p>
      <div className={styles.authButtons}>
        <Link href="/signin" className={styles.button}>
          Sign In
        </Link>
        <Link href="/signup" className={styles.button}>
          Sign Up
        </Link>
      </div>
    </section>
  );
}
