"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/helper/supabaseClient";
import styles from "./index.module.scss";

const SignUp = () => {
  const t = useTranslations("SigUp");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAuthError("");

    if (name === "email") {
      setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      if (data.user) {
        setSuccessMessage("Check your email for confirmation!");
      }
    } catch (error) {
      setAuthError("An unexpected error occurred");
    }
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
            className={styles.input}
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
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        {authError && <p className={styles.error}>{authError}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        <button
          type="submit"
          disabled={!isFormValid}
          className={isFormValid ? styles.button : styles.buttonDisabled}
        >
          {t("submit")}
        </button>
      </form>
      <Link className={styles.link} href="/">
        {t("homeLink")}
      </Link>
      <p>
        Already have an account?{" "}
        <Link className={styles.link} href="/signin">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
