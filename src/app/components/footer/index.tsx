import Link from "next/link";
import styles from "./index.module.scss";
import { useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("Footer");

  const githubLinks = [
    { href: "https://github.com/Tati-Moon", label: t("github1") },
    { href: "https://github.com/von-Wrigley", label: t("github2") },
    { href: "https://github.com/CROCIATOFAF", label: t("github3") },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {githubLinks.map((link, index) => (
          <Link key={index} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
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
