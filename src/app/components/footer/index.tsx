import Link from "next/link";
import styles from "./index.module.scss";
import { useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link
          href="https://github.com/von-Wrigley/rest-client-app"
          className={styles.link}
        >
          {t("github")}
        </Link>
        <span>&copy; 2025</span>
        <Link
          href="https://rs.school/courses/reactjs"
          className={styles.courseLink}
        >
          <img
            src="/rss-logo.svg"
            alt={t("courseAlt")}
            className={styles.courseLogo}
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
