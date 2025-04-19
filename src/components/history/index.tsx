"use client";
import { useLocalStorage } from "@/app/hooks/LocStor";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";

const History = () => {
  const [name] = useLocalStorage("country", []);
  const [routes, setRoutes] = useState([]);
  const t = useTranslations("History");

  useEffect(() => {
    setRoutes(name);
  }, [name]);

  return (
    <div className="flex-1 flex flex-col gap-y-7 mx-auto mt-2.5">
      {routes.length > 0 ? (
        <h1 className={styles.historyHeader}>{t("lastRequest")}</h1>
      ) : (
        <div className={styles.requestHistoryWrapper}>
          <h3 className={styles.historyHeader}>{t("noRequest")}</h3>
          <Link
            className={styles.link}
            href="/collections"
          >
            {t("Collections")}
          </Link>
        </div>
      )}

      {routes?.length > 0 &&
        routes
          ?.sort(function (a, b) {
            return +new Date(b.date) - +new Date(a.date);
          })
          .map((x) => ({
            ...x,
            date:
              new Date(x.date).getDate() +
              "." +
              (new Date(x.date).getMonth() + 1 < 10
                ? "0" + (new Date(x.date).getMonth() + 1)
                : new Date(x.date).getMonth() + 1) +
              "." +
              new Date(x.date).getFullYear() +
              " " +
              new Date(x.date).getHours() +
              ":" +
              (new Date(x.date).getMinutes() < 10
                ? "0" + new Date(x.date).getMinutes()
                : new Date(x.date).getMinutes()),
          }))
          .map((x, index) => (
            <div key={index}>
              <p className={styles.date}>{x.date}</p>
              <Link
                className={styles.link}
                href="/collections"
                as={`collections/${x.method}/${x.urlCode}/${x.body}?${x.headers}`}
              >
                {x.method} {x.input}
              </Link>
            </div>
          ))}
    </div>
  );
};

export default History;
