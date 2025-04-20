"use client";
import React, { useEffect, useState } from "react";
import Form from "next/form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectedHeaders } from "@/app/redux/ContentSelected";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

type HeaderField = {
  name: string;
  value: string;
};

function Headers() {
  const savedHeaders = useAppSelector(
    (state) => state.selected.selectedContent.headers,
  );

  const [headerFields, setHeaderFields] = useState<HeaderField[]>(() =>
    savedHeaders.length > 0
      ? savedHeaders.map((h) => {
          const key = Object.keys(h)[0];
          const value = h[key];
          return { name: key, value };
        })
      : [{ name: "", value: "" }],
  );

  const dispatch = useAppDispatch();

  const handleAddHeader = () => {
    setHeaderFields([...headerFields, { name: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = headerFields.filter((_, i) => i !== index);
    setHeaderFields(updatedHeaders);
  };

  const handleHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    const updatedFields = headerFields.map((field, i) =>
      i === index ? { ...field, [name]: value } : field,
    );

    setHeaderFields(updatedFields);
  };

  useEffect(() => {
    dispatch(selectedHeaders(headerFields));
  }, [headerFields, dispatch]);

  const t = useTranslations("Headers");

  return (
    <Form action="">
      <h2>{t("headers")}</h2>
      <div className={styles.headersWrapper}>
        <button
          onClick={handleAddHeader}
          type="button"
          className={styles.addButton}
        >
          {t("btnAdd")}
        </button>

        {headerFields.map((field, index) => (
          <div className={styles.inputWrapper} key={index}>
            <input
              type="text"
              placeholder={t("key")}
              name="name"
              value={field.name}
              onChange={(e) => handleHeaderChange(e, index)}
              className={styles.inputKey}
            />
            <input
              type="text"
              placeholder={t("value")}
              name="value"
              value={field.value}
              onChange={(e) => handleHeaderChange(e, index)}
              className={styles.inputValue}
            />
            <button
              type="button"
              onClick={() => handleRemoveHeader(index)}
              className={styles.deleteButton}
            >
              {t("btnDelete")}
            </button>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default Headers;
