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
    <div className="border flex flex-col gap-y-3 p-2.5  ">
      <button
        onClick={handleAddVariable}
        type="button"
        className="bg-green-400 w-18 py-1.5"
      >
        Add
      </button>

      {inputs?.map((item: Variable, index: number) => (
        <div className="flex gap-x-2 " key={index}>
          <input
            type="text"
            placeholder="key"
            name="key"
            value={item.key}
            onChange={(e) => handleVariable(e, index)}
            className="border border-gray-300 "
          />
          <input
            type="text"
            placeholder="value"
            name="value"
            value={item.value}
            onChange={(e) => handleVariable(e, index)}
            className="border border-gray-300 "
          />
          <button
            type="button"
            onClick={() => handleRemoveVariable(index)}
            className="bg-red-600 p-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default VariablesComponent;
