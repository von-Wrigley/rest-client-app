"use client";
import { addBodyReq } from "@/app/redux/ContentSelected";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import React, { useState } from "react";
import styles from "./index.module.scss";

function BodyEditor() {
  const [useSelect, setSelect] = useState("JSON");

  const dispatch = useAppDispatch();

  const bodyFromHistory = useAppSelector(
    (state) => state.selected.selectedContent.bodyReq,
  );

  const [bodyPost, setBodyPost] = useState(
    decodeURIComponent(bodyFromHistory) ?? "",
  );
  const handleSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(target.value);
  };
  const handleBodyRequest = () => {
    dispatch(addBodyReq(bodyPost));
  };

  const formatCode = (bodyPost: string) => {
    const parsedData = JSON.parse(bodyPost);
    const x = JSON.stringify(parsedData, null, 4);
    setBodyPost(parsedData.length < 0 ? "" : x);
  };

  return (
    <>
      <form method="post" name="bodyEditor">
        <div className={styles.formWrapper}>
          <h2>Body: [JSON/Text Editor]</h2>
          <div className={styles.inputWrapper}>
            <select
              id="selectFormat"
              className={styles.selectInput}
              name="selectFormat"
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
            className={styles.textareaInput}
            name="RequestBody"
            onChange={(e) => setBodyPost(e.target.value)}
            onBlur={handleBodyRequest}
          ></textarea>
        </div>
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
