"use client";
import React from "react";
import { addMethod } from "@/app/redux/ContentSelected";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

function Method() {
  const method = useAppSelector(
    (state) => state.selected.selectedContent.method
  );

  const dispatch = useAppDispatch();

  const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(addMethod(target.value));
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
      <option value="GET">GET</option>
      <option value="DELETE">DELETE</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="PATCH">PATCH</option>
    </select>
  );
}

export default Method;
