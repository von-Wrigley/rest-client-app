import { useTranslations } from "next-intl";
import styles from "./index.module.scss";
import Link from "next/link";

const SigIn = () => {
  const t = useTranslations("SigIn");

  return (
    <div className={styles.container}>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/" className={styles.homeLink}>
        {t("homeLink")}
      </Link>
    </div>
  );
};

export default SigIn;
