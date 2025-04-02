import React from "react";
import Link from "next/link";
import styles from "@/styles/unauthorized.module.scss";

const Unauthorized: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>401 - Unauthorized</h1>
      <p>You do not have access to this page.</p>
      <Link href="/" className={styles.homeLink}>
        Go back home
      </Link>
    </div>
  );
};

export default Unauthorized;
