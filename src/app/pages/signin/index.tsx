"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Skeleton from "@/app/components/skeleton";
import styles from "./index.module.scss";

const SigIn = () => {
  const t = useTranslations("SigIn");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton variant="medium" className={styles.title} />
        <Skeleton variant="large" className={styles.description} />
        <Skeleton variant="medium" className={styles.homeLink} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/" className={styles.homeLink}>
        {t("homeLink")}
      </Link>
    </div>
  );
};

export default SigIn;
