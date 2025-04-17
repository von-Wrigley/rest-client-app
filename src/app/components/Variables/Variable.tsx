"use client";

import { useLocalStorage } from "@/app/hooks/LocStor";
import React, { useEffect, useState } from "react";
import styles from "./Variable.module.scss";

type Variable = {
  key: string;
  value: string;
};

function VariablesComponent() {
  const [variablestorage, setVariableStorage] = useLocalStorage(
    "variables",
    [],
  );

  const [inputs, setInputs] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    setInputs(variablestorage);
  }, [variablestorage]);

  const handleAddVariable = () => {
    setInputs([...inputs, { key: "", value: "" }]);
  };

  const handleRemoveVariable = (index: number) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  const handleVariable = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const list = [...inputs];
    list[index][name] = value;
    setInputs(list);

    if (typeof window !== "undefined") {
      setVariableStorage(inputs);
    }
  };

  return (
    <div className={styles.variablesWrapper}>
      <button
        onClick={handleAddVariable}
        type="button"
        className={styles.addButton}
      >
        Add
      </button>

      {inputs?.map((item: Variable, index: number) => (
        <div className={styles.inputWrapper} key={index}>
          <input
            type="text"
            placeholder="key"
            name="key"
            value={item.key}
            onChange={(e) => handleVariable(e, index)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="value"
            name="value"
            value={item.value}
            onChange={(e) => handleVariable(e, index)}
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => handleRemoveVariable(index)}
            className={styles.button}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default VariablesComponent;
