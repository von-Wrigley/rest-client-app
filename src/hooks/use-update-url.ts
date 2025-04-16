"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/app/redux/hooks";

type HeaderItem = {
  name: string;
  value: string;
};

export const useUpdateUrl = () => {
  const pathname = usePathname();
  const method = useAppSelector(
    (state) => state.selected.selectedContent.method,
  );
  const inputURL = useAppSelector(
    (state) => state.selected.selectedContent.inputURL,
  );
  const bodyReq = useAppSelector(
    (state) => state.selected.selectedContent.bodyReq,
  );

  const headers = useAppSelector(
    (state) => state.selected.selectedContent.headers,
  );

  useEffect(() => {
    const queryParams = (headers as HeaderItem[])
      .filter(({ name }) => name.trim() !== "")
      .map(
        ({ name, value }) =>
          `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
      )
      .join("&");

    const fullUrl = window.location.href;
    const [leftPart] = fullUrl.split("/collections");
    const baseUrl = `${leftPart}/collections`;

    window.history.replaceState(
      window.history.state,
      "",
      `${baseUrl}/${method ? `${method}` : "UNDEFINED"}${inputURL ? `/${inputURL}` : ""}${bodyReq ? `/${bodyReq}` : ""}${queryParams ? `?${queryParams}` : ""}`,
    );
  }, [method, inputURL, bodyReq, headers, pathname]);
};
