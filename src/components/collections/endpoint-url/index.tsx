"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";

import { addInputURL } from "@/app/redux/ContentSelected";

function EndpointURL() {
  const inputURL = useAppSelector(
    (state) => state.selected.selectedContent.inputURL,
  );

  const normalURL = atob(decodeURIComponent(inputURL));

  const [inputState, setState] = useState(normalURL.toString() ?? "");

  const dispatch = useAppDispatch();

  const handleChangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  useEffect(() => {
    const asciiStringEncoded = btoa(inputState);

    dispatch(addInputURL(asciiStringEncoded));
  }, [inputState, dispatch]);

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
