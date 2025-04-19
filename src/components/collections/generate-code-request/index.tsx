"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { HTTPSnippet } from "@readme/httpsnippet";
import { useLocalStorage } from "@/app/hooks/LocStor";
import Skeleton from "@/app/components/skeleton";
import styles from "./index.module.scss";

// const listOfLanguages = {
//     "curl": "cURL",
//     JavaScript (Fetch api)
//     JavaScript (XHR)
//     "nodejs": "NodeJs",
//     "python": "Python",
//     "java": "Java",
//     "csharp": "C#",
//     "go": "Go",
//   }
import { useTranslations } from "next-intl";

function GenerateCodeRequest() {
  const [selectLang, setSelectLang] = useState("null");
  const [generatedSnippet, setGeneratedSnippet] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("Snippet");

  const stateMethod = useAppSelector(
    (state) => state.selected.selectedContent,
  ).method;
  const inputState = useAppSelector(
    (state) => state.selected.selectedContent,
  ).inputURL;
  const headersRedux = useAppSelector(
    (state) => state.selected.selectedContent,
  ).headers;
  const bodyRedux = useAppSelector(
    (state) => state.selected.selectedContent,
  ).bodyReq;
  const [variablestorage] = useLocalStorage("variables", []);

  const handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLang(e.target.value);
  };

  const getVariant = (lang: string) => {
    if (lang === "Go") {
      return "Native";
    } else if (lang === "shell") {
      return "curl";
    } else if (lang === "NodeJs") {
      return "Request";
    } else if (lang === "Python") {
      return "Requests";
    } else if (lang === "Java") {
      return "OkHttp";
    } else if (lang === "C#") {
      return "HttpClient";
    } else if (lang === "javascript_fetch") {
      return "fetch";
    } else if (lang === "javascript_xhr") {
      return "xhr";
    }
  };

  useEffect(() => {
    let atobURl = atob(inputState);
    const provewithoutVariables = variablestorage.map(
      (x: { key: string; value: string }) => atobURl.includes(x.key),
    );
    if (provewithoutVariables) {
      const newX = variablestorage.map((x: { key: string; value: string }) => {
        const newstr = atobURl.replace(
          new RegExp("\{\{(?:\\s+)?(" + x.key + ")(?:\\s+)?\}\}"),
          x.value,
        );
        atobURl = newstr;
        console.log(newstr);
        return atobURl;
      });
    }

    const snippet = new HTTPSnippet({
      method: stateMethod,
      url: atobURl,
      headers: headersRedux,
      body: bodyRedux,
    });

    const output = snippet.convert(
      selectLang.length > 7 ? selectLang.slice(0, 10) : selectLang,
      getVariant(selectLang),
    );

    setGeneratedSnippet(output || "");
  }, [selectLang, inputState]);

  // SKELETON STATE: mirror the final structure with placeholders
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton variant="medium" className={styles.title} />
        <Skeleton variant="small" className={styles.selector} />
        <Skeleton variant="large" className={styles.textarea} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> {t("Snippet")}</h2>
      <select
        id="selLang"
        className={styles.selector}
        name="selLang"
        value={selectLang}
        onChange={handlechange}
      >
        <option disabled value="null">
          {t("ChooseLang")}{" "}
        </option>
        <option value="shell">cURL</option>
        <option value="javascript_fetch">JavaScript (Fetch api)</option>
        <option value="javascript_xhr">JavaScript (XHR)</option>
        <option value="node">NodeJs</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="csharp">C#</option>
        <option value="go">Go</option>
      </select>
      <textarea
        id="generateCode"
        className={styles.textarea}
        name="generateCode"
        readOnly
        value={generatedSnippet}
      ></textarea>
    </div>
  );
}

export default GenerateCodeRequest;
