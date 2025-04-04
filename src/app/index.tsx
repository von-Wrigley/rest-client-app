import Head from "next/head";
import Link from "next/link";
import Header from "./components/header";
import Footer from "./components/footer";
import styles from "../styles/Home.module.scss";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Final Task App</title>
        <meta
          name="description"
          content="REST Client App for Rolling Scopes School"
        />
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <section className={styles.welcome} data-testid="welcome-section">
            <h2>Welcome!</h2>
            <p>
              This REST client application allows you to test any API, manage
              request history, and work with variables.
            </p>
            <div className={styles.authButtons}>
              <Link href="/signin" className={styles.button}>
                Sign In
              </Link>
              <Link href="/signup" className={styles.button}>
                Sign Up
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
