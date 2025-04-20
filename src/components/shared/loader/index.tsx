import React from "react";
import styles from "./index.module.scss";

interface LoaderProps {
  isLoading: boolean;
  t: (key: string) => string;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, t }) => {
  if (!isLoading) return null;

  return <div className={styles.container}>{t("loading")}...</div>;
};

export default Loader;
