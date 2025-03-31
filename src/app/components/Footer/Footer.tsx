import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <Link href="https://github.com/von-Wrigley/rest-client-app" className={styles.link}>
          GitHub Link
        </Link>
        <span>&copy; {new Date().getFullYear()}</span>
        <Link href="https://rs.school/courses/reactjs" className={styles.courseLink}>
          <img src="/rss-logo.svg" alt="Course Logo" className={styles.courseLogo} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
