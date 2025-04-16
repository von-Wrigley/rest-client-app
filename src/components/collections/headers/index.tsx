"use client";
import React, { useEffect, useState } from "react";
import Form from "next/form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectedHeaders } from "@/app/redux/ContentSelected";
import styles from "./index.module.scss";

type inputsDispatch = {
  key: string;
  value: string;
};

function Headers() {
  const headers = useAppSelector(
    (state) => state.selected.selectedContent.headers,
  );
  const [inputs, setInputs] = useState<inputsDispatch[]>(
    headers.length > 0 ? headers : [{ name: "", value: "" }],
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
    index: number,
  ) => {
    const { name, value } = e.target;
    const list = [...inputs.map((input) => ({ ...input }))];

    list[index][name as keyof inputsDispatch] = value;

    setInputs(list);
  };

  return (
    <Form action="">
      <h2>Headers</h2>
      <div className={styles.headersWrapper}>
        <button
          onClick={handleAddHeader}
          type="button"
          className={styles.addButton}
        >
          Add
        </button>

        {inputs?.map((item, index) => (
          <div className={styles.inputWrapper} key={index}>
            <input
              type="text"
              placeholder="key"
              name="name"
              value={item.name}
              onChange={(e) => handleHeader(e, index)}
              className={styles.inputKey}
            />
            <input
              type="text"
              placeholder="value"
              name="value"
              value={item.value}
              onChange={(e) => handleHeader(e, index)}
              className={styles.inputValue}
            />
            <button
              type="button"
              onClick={() => handleRemoveHeader(index)}
              className={styles.deleteButton}
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
