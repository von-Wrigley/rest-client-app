"use client";

import VariablesComponent from "@/app/components/Variables/Variable";
import React from "react";
import styles from "./index.module.scss";
import { useTranslations } from "next-intl";

function Variables() {
  const t = useTranslations("Variables");
  return (
    <div>
      <div>
        <h1 className={styles.header}>{t("variables")}</h1>
        <VariablesComponent />
      </div>
    </div>
  );
}

export default Variables;
