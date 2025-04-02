import React from "react";
import Link from "next/link";
import styles from "@/styles/notFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn’t find the page you were looking for.</p>
      <Link href="/" className={styles.homeLink}>
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
