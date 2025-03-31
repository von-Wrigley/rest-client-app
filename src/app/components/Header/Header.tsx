import Link from "next/link";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          Postman Clone
        </Link>
      </div>
      <div className={styles.headerRight}>
        <img src="/rss-logo.svg" alt="Course Logo" />
        <button className={styles.langToggle}>EN</button>
        <div className={styles.authLinks}>
          <Link href="/signin" className={styles.link}>
            Sign In
          </Link>
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
