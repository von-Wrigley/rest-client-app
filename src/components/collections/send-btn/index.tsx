"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { addBodyRes, resContentDetails } from "@/app/redux/ContentSelected";
import { useLocalStorage } from "@/app/hooks/LocStor";
import { HttpMethod } from "@/app/types/http";
import { fetcher } from "@/app/utils/fetcher";
import { useTranslations } from "next-intl";

function BtnSend() {
  const dispatch = useAppDispatch();
  const t = useTranslations("SendBtn");

  const [variablesStorage] = useLocalStorage("variables", []);
  const [requestHistory, setRequestHistory] = useLocalStorage("country", []);
  const [_, setResponseStorage] = useLocalStorage("req", []);
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

    const { data, resOk, status } = await fetcher({
      url: `/api/collections/${decodedURL}`,
      method: method as HttpMethod,
      body: isBodyMethod ? bodyReq : undefined,
      headers: {
        Authorization: "EFfw2342",
        ...headers?.reduce((acc: Record<string, string>, h: any) => {
          if (h.name && h.value) acc[h.name] = h.value;
          return acc;
        }, {}),
      },
    });

    saveToLocal();

    if (method === HttpMethod.DELETE) {
      dispatch(addBodyRes("{}"));
    } else {
      handleFormatter(JSON.stringify(data));
    }

    dispatch(resContentDetails([{ resOk, resStatus: status }]));
    setResponseStorage(data);
  };

  return (
    <button type="submit" className="bg-blue-100 p-4" onClick={handleRequest}>
      {t("btnSend")}
    </button>
  );
}

export default BtnSend;
