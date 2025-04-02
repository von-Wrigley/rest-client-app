"use client";

import React, { useEffect } from "react";
import styles from "@/styles/errorPage.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorPage}>
      <h1>500 - Server Error</h1>
      <p>Something went wrong on our end.</p>
      <button onClick={reset} className={styles.resetButton}>
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
