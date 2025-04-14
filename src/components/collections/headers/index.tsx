"use client";
import React, { useEffect, useState } from "react";
import Form from "next/form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectedHeaders } from "@/app/redux/ContentSelected";
type inputsDispatch = {
  key: string;
  value: string;
};

function Headers() {
  const headers = useAppSelector(
    (state) => state.selected.selectedContent.headers
  );
  const [inputs, setInputs] = useState<inputsDispatch[]>(
    headers.length > 0 ? headers : [{ name: "", value: "" }]
  );

  const dispatch = useAppDispatch();

  const handleAddHeader = () => {
    setInputs([...inputs, { name: "", value: "" }]);
  };
  const handleRemoveHeader = (index: number) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  useEffect(() => {
    let newInp = [];

    inputs.map((x) => newInp.push({ name: x.name, value: x.value }));

    dispatch(selectedHeaders(newInp));
  }, [inputs]);

  const handleHeader = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const list = [...inputs.map((input) => ({ ...input }))];

    list[index][name as keyof inputsDispatch] = value;

    setInputs(list);
  };

  return (
    <Form action="">
      <h2>Headers</h2>
      <div className="flex flex-col gap-y-7">
        <button
          onClick={handleAddHeader}
          type="button"
          className="bg-green-400 w-18"
        >
          Add
        </button>

        {inputs?.map((item, index) => (
          <div className="flex gap-x-2  " key={index}>
            <input
              type="text"
              placeholder="key"
              name="name"
              value={item.name}
              onChange={(e) => handleHeader(e, index)}
              className="border border-gray-300 "
            />
            <input
              type="text"
              placeholder="value"
              name="value"
              value={item.value}
              onChange={(e) => handleHeader(e, index)}
              className="border border-gray-300 "
            />
            <button
              type="button"
              onClick={() => handleRemoveHeader(index)}
              className="bg-red-600 p-3"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default Headers;
