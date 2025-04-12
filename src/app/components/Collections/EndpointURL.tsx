"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { addInputURL } from "@/app/redux/ContentSelected";

function EndpointURL() {
  const params = useParams();
  const historyMethod = params.slug?.[0];
  const inputfromhistory = params.slug?.[1] ?? "";
  const bodyfromhistory = params.slug?.[2];

  const normalURL = atob(decodeURIComponent(inputfromhistory));

  const [inputState, setState] = useState(normalURL.toString() ?? "");
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const stateMethod = useAppSelector(
    (state) => state.selected.selectedContent,
  ).method;
  const bodyReq = useAppSelector(
    (state) => state.selected.selectedContent,
  ).bodyReq;
  const bodyReqURL = btoa(bodyReq);

  const handleChangeURL = (e) => {
    setState(e.target.value);
    // const currentUrl = new URL(window.location.href);
  };

  useEffect(() => {
    const asciiStringEncoded = btoa(inputState);

    dispatch(addInputURL(asciiStringEncoded));

    if (inputfromhistory && historyMethod && bodyfromhistory) {
      window.history.replaceState(
        null,
        "",
        "/personal" +
          "/" +
          historyMethod +
          "/" +
          inputfromhistory +
          "/" +
          (bodyfromhistory ?? ""),
      );
    }

    window.history.replaceState(
      window.history.state,
      "",
      pathname +
        (stateMethod.length > 0 ? "/" + stateMethod : "") +
        "/" +
        asciiStringEncoded +
        (bodyReqURL.length > 0 ? "/" + bodyReqURL : ""),
    );
  }, [inputState, stateMethod, historyMethod]);

  return (
    <input
      type="text"
      value={inputState}
      className="p-4"
      onChange={handleChangeURL}
    />
  );
}

export default EndpointURL;
