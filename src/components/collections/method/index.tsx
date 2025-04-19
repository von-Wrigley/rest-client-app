"use client";

import React from "react";
import { addMethod } from "@/app/redux/ContentSelected";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { HttpMethod } from "@/app/types/http";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

function Method() {
  const t = useTranslations("Method");
  const method = useAppSelector(
    (state) => state.selected.selectedContent.method,
  );

  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(addMethod(target.value as HttpMethod));
  };

  return (
    <select
      id="method"
      className={styles.method}
      name="Method"
      value={method}
      onChange={handleChange}
    >
      <option disabled value="">
        {t("SelectMethod")}
      </option>
      {}
      {Object.values(HttpMethod).map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

export default Method;
