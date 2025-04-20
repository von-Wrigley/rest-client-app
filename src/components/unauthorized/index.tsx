import React from "react";
import Link from "next/link";
import Skeleton from "@/app/components/skeleton";
import styles from "./index.module.scss";

interface UnauthorizedProps {
  isLoading: boolean;
  t: (key: string) => string;
}

const Unauthorized: React.FC<UnauthorizedProps> = ({ isLoading, t }) => {
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

export default Unauthorized;
