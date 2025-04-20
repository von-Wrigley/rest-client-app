"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { HTTPSnippet } from "@readme/httpsnippet";
import styles from "./index.module.scss";

import { useTranslations } from "next-intl";

function GenerateCodeRequest() {
  const [selectLang, setSelectLang] = useState("null");
  const [generatedSnippet, setGeneratedSnippet] = useState("");
  const t = useTranslations("Snippet");

  const stateMethod = useAppSelector(
    (state) => state.selected.selectedContent
  ).method;
  const inputState = useAppSelector(
    (state) => state.selected.selectedContent
  ).inputURL;
  const headersRedux = useAppSelector(
    (state) => state.selected.selectedContent
  ).headers;
  const bodyRedux = useAppSelector(
    (state) => state.selected.selectedContent
  ).bodyReq;

  const handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLang(e.target.value);
  };

  type Target = Parameters<HTTPSnippet["convert"]>[0];
  type Client = Parameters<HTTPSnippet["convert"]>[1];

  useEffect(() => {
    const languageMap: Record<string, { target: Target; client?: Client }> = {
      shell: { target: "shell", client: "curl" },
      javascript_fetch: { target: "javascript", client: "fetch" },
      javascript_xhr: { target: "javascript", client: "xhr" },
      node: { target: "node", client: "request" },
      python: { target: "python", client: "requests" },
      java: { target: "java", client: "okhttp" },
      csharp: { target: "csharp", client: "httpclient" },
      go: { target: "go", client: "native" },
    };
    const langConfig = languageMap[selectLang];
    if (!langConfig) return;
    const atobURl = atob(inputState);

    const snippet = new HTTPSnippet({
      method: stateMethod,
      url: atobURl,
      httpVersion: "HTTP/1.1",
      headers: headersRedux.map((header) => ({
        name: Object.keys(header)[0],
        value: Object.values(header)[0],
      })),
      postData: {
        mimeType: "application/json",
        text: bodyRedux,
      },
    });

    const output = snippet.convert(langConfig.target, langConfig.client);

    setGeneratedSnippet(
      Array.isArray(output) ? output.join("\n") : output || ""
    );
  }, [
    selectLang,
    inputState,
    stateMethod,
    headersRedux,
    bodyRedux,
  ]);

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
