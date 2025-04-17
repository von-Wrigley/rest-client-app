"use client";
import React from "react";
import { addMethod } from "@/app/redux/ContentSelected";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { HttpMethod } from "@/app/types/http";


function Method() {
  const method = useAppSelector(
    (state) => state.selected.selectedContent.method,
  );

  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(addMethod(target.value as HttpMethod));
  };

  return (
    <select
      name="Method"
      id="method"
      className="p-2 m-2"
      value={method}
      onChange={handleChange}
    >
      <option disabled value="">
        Select Method
      </option>
      {}
      {Object.values(HttpMethod).map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}

export default Method;
