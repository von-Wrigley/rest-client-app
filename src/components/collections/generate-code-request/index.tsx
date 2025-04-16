"use client";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { HTTPSnippet } from "@readme/httpsnippet";
import { useLocalStorage } from "@/app/hooks/LocStor";

// const listOfLanguages = {
//     "curl": "cURL",
//
// JavaScript (Fetch api)
// JavaScript (XHR)
//     "nodejs": "NodeJs",
//     "python": "Python",
//     "java": "Java",
//     "csharp": "C#",
//     "go": "Go",
//   }

function GenerateCodeRequest() {
  const [selectLang, setSelectLang] = useState("null");
  const [generatedSnippet, setGeneratedSnippet] = useState("");

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
      (x: { key: string; value: string }) => atobURl.includes(x.key)
    );
    if (provewithoutVariables) {
      const newX = variablestorage.map((x: { key: string; value: string }) => {
        const newstr = atobURl.replace(
          new RegExp("\{\{(?:\\s+)?(" + x.key + ")(?:\\s+)?\}\}"),
          x.value
        );
        atobURl = newstr;
        console.log(newstr);
        return atobURl;
      });
    }
    //нужно проверить с боди гнератор

    const snippet = new HTTPSnippet({
      method: stateMethod,
      url: atobURl,
      headers: headersRedux,
      body: bodyRedux,
    });

    const output = snippet.convert(
      selectLang.length > 7 ? selectLang.slice(0, 10) : selectLang,
      getVariant(selectLang)
    );

    setGeneratedSnippet(output || "");
  }, [selectLang, inputState]);

  return (
    <div>
      <h2>Code snippet </h2>
      <select
        name="selLang"
        id="selLang"
        value={selectLang}
        onChange={handlechange}
      >
        <option disabled value="null">
          Select language{" "}
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
        className="border"
        cols={40}
        name="generateCode"
        id="generateCode"
        readOnly
        value={generatedSnippet}
      ></textarea>
    </div>
  );
}

export default GenerateCodeRequest;
