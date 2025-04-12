"use client";
import { addBodyReq } from "@/app/redux/ContentSelected";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { useParams, usePathname } from "next/navigation";
import React, { useState } from "react";

function BodyEditor() {
  const [useSelect, setSelect] = useState("JSON");

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const stateMethod = useAppSelector(
    (state) => state.selected.selectedContent,
  ).method;
  const inputURL = useAppSelector(
    (state) => state.selected.selectedContent,
  ).inputURL;
  const headers =
    useAppSelector((state) => state.selected.selectedContent).headers ?? "";

  const params = useParams();
  const historyMethod = params.slug?.[0];
  const inputfromhistory = params.slug?.[1];
  const bodyfromhistory = params.slug?.[2] ?? "";

  const [bodyPost, setBodyPost] = useState(
    decodeURIComponent(bodyfromhistory) ?? "",
  );
  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(target.value);
  };
  const handleBodyRequest = () => {
    const currentUrl = new URL(window.location.href);
    console.log(currentUrl.pathname);
    const bodyRequest = btoa(bodyPost);
    dispatch(addBodyReq(bodyPost));

    if (bodyfromhistory?.length > 0) {
      window.history.replaceState(
        null,
        "",
        "/personal" +
          "/" +
          historyMethod +
          "/" +
          (inputfromhistory ?? "") +
          "/" +
          (bodyPost ?? "") +
          "?" +
          (headers ?? ""),
      );
    }

    window.history.pushState(
      window.history.state,
      "",
      pathname +
        "/" +
        stateMethod +
        "/" +
        (inputURL ?? "") +
        (bodyRequest.length > 0 ? "/" + bodyRequest : "") +
        "?" +
        (headers ?? ""),
    );
  };

  const formatCode = (bodyPost: string) => {
    const parsedData = JSON.parse(bodyPost);
    const x = JSON.stringify(parsedData, null, 4);
    setBodyPost(parsedData.length < 0 ? "" : x);
  };

  return (
    <>
      <form method="post" name="bodyEditor">
        <div className="flex">
          <h2>Body: [JSON/Text Editor]</h2>
          <select
            name="selectFormat"
            id="selectFormat"
            value={useSelect}
            onChange={handleSelect}
          >
            <option value="JSON">JSON</option>
            <option value="TEXT">TEXT</option>
          </select>
        </div>

        <textarea
          placeholder="this text will show in the textarea"
          value={bodyPost}
          className="border"
          rows={5}
          name="RequestBody"
          onChange={(e) => setBodyPost(e.target.value)}
          onBlur={handleBodyRequest}
        ></textarea>
      </form>
      {bodyPost.length > 0 && useSelect === "JSON" && (
        <button type="button" onClick={() => formatCode(bodyPost)}>
          Beautify
        </button>
      )}
    </>
  );
}

export default BodyEditor;
