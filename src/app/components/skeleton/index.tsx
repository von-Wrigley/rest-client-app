"use client";

import React from "react";
import styles from "./index.module.scss";

export interface SkeletonProps {
  variant?: "small" | "medium" | "large";
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = "medium",
  className = "",
}) => {
  return (
    <div className={`${styles.skeleton} ${styles[variant]} ${className}`} />
  );
};

export default Skeleton;
