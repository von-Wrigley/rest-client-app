import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";

interface SignUpFormProps {
  t: (key: string) => string;
  formData: { email: string; password: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isValidEmail: boolean;
  authError: string;
  successMessage: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  t,
  formData,
  onChange,
  onSubmit,
  isValidEmail,
  authError,
  successMessage,
}) => {
  const isFormValid = formData.email && formData.password && isValidEmail;

  return (
    <div className={styles.container}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <form data-testid="signup-form" onSubmit={onSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">{t("email")}</label>
          <input
            id="email"
            className={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          {!isValidEmail && <p className={styles.error}>{t("invalidEmail")}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="password">{t("password")}</label>
          <input
               id="password"
            className={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            required
          />
          {authError && <p className={styles.error}>{authError}</p>}
          {successMessage && <p className={styles.success}>{successMessage}</p>}
        </div>

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
        {t("haveAccount")}{" "}
        <Link className={styles.link} href="/signin">
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
