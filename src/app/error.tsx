"use client";

import React, { useState, useEffect } from "react";
import Skeleton from "./components/skeleton";
import styles from "@/styles/errorPage.module.scss";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.error(error);
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.skeletonWrapper}>
        <Skeleton variant="large" />
      </div>
    );
  }

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
