"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { addBodyRes, resContentDetails } from "@/app/redux/ContentSelected";
import { useLocalStorage } from "@/app/hooks/LocalStorage";
import { HttpMethod } from "@/app/types/http";
import { fetcher } from "@/app/utils/fetcher";
import { useTranslations } from "next-intl";
import styles from "./index.module.scss";

function BtnSend() {
  const dispatch = useAppDispatch();
  const t = useTranslations("SendBtn");

  const [variablesStorage] = useLocalStorage("variables", []);
  const [requestHistory, setRequestHistory] = useLocalStorage("country", []);
  const [, setResponseStorage] = useLocalStorage("req", []);
  const currentDate = new Date();

  const { method, inputURL, bodyReq, headers } = useAppSelector(
    (state) => state.selected.selectedContent,
  );

  let decodedURL = atob(inputURL);

  const replaceVariablesInURL = () => {
    variablesStorage.forEach((variable: { key: string; value: string }) => {
      const regex = new RegExp(`\\{\\{\\s*${variable.key}\\s*\\}\\}`, "g");
      decodedURL = decodedURL.replace(regex, variable.value);
    });
  };

  const saveToLocal = () => {
    if (typeof window !== "undefined") {
      setRequestHistory([
        ...requestHistory,
        {
          method,
          input: decodedURL,
          date: currentDate,
          urlCode: inputURL,
          body: bodyReq,
          headers,
        },
      ]);
    }
  };

  const handleFormatter = (responseBody: string) => {
    const formatted = JSON.stringify(JSON.parse(responseBody), null, 4);
    dispatch(addBodyRes(formatted));
  };

  const handleRequest = async () => {
    replaceVariablesInURL();

    const isBodyMethod = [
      HttpMethod.POST,
      HttpMethod.PUT,
      HttpMethod.PATCH,
    ].includes(method as HttpMethod);
    const cleanedHeaders = (
      headers as { name: string; value: string }[]
    ).filter(({ name }) => name.trim() !== "");
    const customHeaderValue = JSON.stringify(cleanedHeaders);
    const { data, resOk, status, statusText } = await fetcher({
      url: `/api/collections/${decodedURL}`,
      method: method as HttpMethod,
      body: isBodyMethod ? bodyReq : undefined,
      headers: {
        "X-Custom-Headers": customHeaderValue,
      },
    });

    saveToLocal();

    handleFormatter(JSON.stringify(data));

    dispatch(resContentDetails([{ resOk, resStatus: status, statusText }]));
    setResponseStorage(data);
  };

  return (
    <button type="submit" className={styles.sendButton} onClick={handleRequest}>
      {t("btnSend")}
    </button>
  );
}

export default BtnSend;
