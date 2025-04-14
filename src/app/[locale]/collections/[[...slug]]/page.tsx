//  TODO try to change to Server render
"use client";

import Collections from "@/components/collections";
import { createStore } from "@/app/redux/store";
import { Provider } from "react-redux";
import React from "react";

const CollectionsPage = ({
  params,
  searchParams,
}: {
  params: { locale: string; slug?: string[] };
  searchParams: { [key: string]: string };
}) => {
  const { slug = [] } = params;
  const [method = "UNDEFINED", encodedUrl, encodedBody] = slug;

  const searchParamsArray = Object.entries(searchParams).map(
    ([key, value]) => ({
      name: decodeURIComponent(key),
      value: decodeURIComponent(value),
    })
  );

  const preloadedState = {
    selected: {
      selectedContent: {
        method: method === "UNDEFINED" ? "" : method,
        inputURL: encodedUrl ? decodeURIComponent(encodedUrl) : "",
        bodyReq: encodedBody ? decodeURIComponent(encodedBody) : "",
        bodyRes: "",
        details: [],
        generateCode: [],
        selectedLang: "",
        headers: searchParamsArray,
      },
    },
  };
  const store = createStore(preloadedState);
  return (
    <Provider store={store}>
      <Collections />
    </Provider>
  );
};
export default CollectionsPage;
