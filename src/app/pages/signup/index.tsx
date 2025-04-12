"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "./index.module.scss";

const SignUp = () => {
  const t = useTranslations("SigUp");
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SignUp submitted:", formData);
  };

  const isFormValid = formData.email && formData.password && isValidEmail;

  if (isLoading)
    return <div className={styles.container}>{t("loading")}...</div>;

  return (
    <div className={styles.container}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          {t("email")}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        {!isValidEmail && <p className={styles.error}>{t("invalidEmail")}</p>}

        <label>
          {t("password")}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={!isFormValid}>
          {t("submit")}
        </button>
      </form>
      <Link href="/">{t("homeLink")}</Link>
    </div>
  );
};

export default SignUp;
