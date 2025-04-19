"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Skeleton from "@/app/components/skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/supabaseClient";
import { Session } from "@supabase/supabase-js";
import styles from "./index.module.scss";

export const WelcomeSection = () => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (isLoading) {
    return (
      <section className={styles.welcome}>
        <Skeleton variant="medium" className={styles.title} />
        <Skeleton className={`${styles.description} ${styles.skeletonLarge}`} />
        <div className={styles.authButtons}>
          <Skeleton variant="small" className={styles.button} />
          <Skeleton variant="small" className={styles.button} />
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
        {session ? (
          <>
            <Link href="/collections" className={styles.button}>
              {t("collections")}
            </Link>
            <Link href="/history" className={styles.button}>
              {t("history")}
            </Link>
            <Link href="/variables" className={styles.button}>
              {t("variables")}
            </Link>
            <button onClick={handleSignOut} className={styles.button}>
              {t("signOut")}
            </button>
          </>
        ) : (
          <>
            <Link href="/signin" className={styles.button}>
              {t("signIn")}
            </Link>
            <Link href="/signup" className={styles.button}>
              {t("signUp")}
            </Link>
          </>
        )}
      </div>
    </section>
  );
};
