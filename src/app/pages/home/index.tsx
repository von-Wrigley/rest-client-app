"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Skeleton from "@/app/components/skeleton";
import Link from "next/link";
import styles from "./index.module.scss";

export const WelcomeSection = () => {
  const t = useTranslations("HomePage");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.welcome}>
        <Skeleton variant="medium" className={styles.title} />
        <Skeleton className={`${styles.description} ${styles.skeletonLarge}`} />
        <div className={styles.authButtons}>
          <Skeleton variant="small" className={styles.button} />
          <Skeleton variant="small" className={styles.button} />
        </div>
      </section>
    );
  }

  return (
    <section className={styles.welcome}>
      <h2 className={styles.title}>{t("title")}</h2>
      <p className={styles.description}>{t("description")}</p>
      <div className={styles.authButtons}>
        <Link href="/signin" className={styles.button}>
          {t("signIn")}
        </Link>
        <Link href="/signup" className={styles.button}>
          {t("signUp")}
        </Link>
      </div>
    </section>
  );
};
