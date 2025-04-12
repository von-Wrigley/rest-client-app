"use client";
import React, { useEffect, useState } from "react";
import { addItem } from "@/app/redux/ContentSelected";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

function Method() {
  const params = useParams();
  const inputfromhistory = params.slug?.[0];
  const inputURLHistory = params.slug?.[1];

  const [stateMethod, setMethod] = useState<string>(inputfromhistory ?? "");
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const inputURL = useAppSelector(
    (state) => state.selected.selectedContent,
  ).inputURL;
  const bodyReq2 = useAppSelector(
    (state) => state.selected.selectedContent,
  ).bodyReq;
  const headers = useAppSelector(
    (state) => state.selected.selectedContent,
  ).headers;

  const handlechange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(target.value);
  };

  useEffect(() => {
    dispatch(addItem(stateMethod));

    if (inputfromhistory) {
      window.history.replaceState(
        null,
        "",
        "/personal" +
          +(stateMethod.length > 0 ? "/" + stateMethod : "") +
          "/" +
          inputURLHistory +
          "?" +
          headers,
      );
    }

    window.history.replaceState(
      window.history.state,
      "",
      pathname +
        (stateMethod.length > 0 ? "/" + stateMethod : "") +
        (inputURL.length > 0 ? "/" + inputURL : "") +
        (bodyReq2.length > 0 ? "/" + bodyReq2 : "") +
        "?" +
        headers,
    );
  }, [stateMethod]);

  return (
    <select
      name="Method"
      id="method"
      className="p-2 m-2"
      value={stateMethod}
      onChange={handlechange}
    >
      <option disabled value="">
        Select Method
      </option>
      <option value="GET">GET</option>
      <option value="DELETE">DELETE</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="PATCH">PATCH</option>
    </select>
  );
}

export default Method;
