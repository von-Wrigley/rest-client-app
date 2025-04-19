"use client";

import React from "react";
import { useAppSelector } from "@/app/redux/hooks";
import styles from "./index.module.scss";

type ResponseDet = {
  resOk: boolean;
  resStatus: number;
  statusText?: string;
};

function ResponseBody() {
  const bodyRes = useAppSelector(
    (state) => state.selected.selectedContent,
  ).bodyRes;
  const resDetails: ResponseDet[] = useAppSelector(
    (state) => state.selected.selectedContent,
  ).details;

  return (
    <div className="flex flex-col justify-self-center">
      <div>
        {resDetails?.map((x, index) => (
          <div key={index} className="w-1/9 mx-auto">
            {x.resOk == true ? (
              <div className="bg-green-500 text-black">
                {x.resStatus} <span>{x.statusText ?? "OK"}</span>
              </div>
            ) : (
              <div className="bg-red-500">
                {x.resStatus} <span>{x.statusText ?? "Not Found"}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <textarea
          id="handleJSON"
          className={styles.textarea}
          defaultValue={bodyRes?.length > 1 ? bodyRes : ""}
          name="bodyResponse"
          readOnly
        />
      </div>
    </div>
  );
}

export default ResponseBody;
