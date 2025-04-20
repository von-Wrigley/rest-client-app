"use client";

import React, { useMemo } from "react";
import { Provider } from "react-redux";
import { createStore } from "@/app/redux/store";

import Collections from ".";
import { RootState } from "@/app/redux/rootReducer";

interface Props {
  method?: string;
  encodedUrl?: string;
  encodedBody?: string;
  searchParams: { [key: string]: string };
}

const CollectionsWrapper = ({
  method = "UNDEFINED",
  encodedUrl,
  encodedBody,
  searchParams,
}: Props) => {
  const searchParamsArray = useMemo(
    () =>
      Object.entries(searchParams).map(([key, value]) => ({
        name: decodeURIComponent(key),
        value: decodeURIComponent(value),
      })),
    [searchParams],
  );

  const preloadedState = useMemo<Partial<RootState>>(
    () => ({
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
    }),
    [method, encodedUrl, encodedBody, searchParamsArray],
  );
  const store = useMemo(() => createStore(preloadedState), [preloadedState]);

  return (
    <Provider store={store}>
      <Collections />
    </Provider>
  );
};

export default CollectionsWrapper;
