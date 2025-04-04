"use client";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import Link from "next/link";

export const WelcomeSection = () => {
  const t = useTranslations("HomePage");

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
