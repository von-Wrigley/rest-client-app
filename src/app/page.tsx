import Image from "next/image";
import styles from "@/page.module.scss";

export default function HomePage() {
  return (
    <section className={styles.welcome}>
      <h2 className={styles.title}>Welcome!</h2>
      <p className={styles.description}>
        This REST client application allows you to test any API, manage request history, and work with variables.
      </p>
      <div className={styles.authButtons}>
        <a href="/signin" className={styles.button}>Sign In</a>
        <a href="/signup" className={styles.button}>Sign Up</a>
      </div>
    </section>
  );
}

