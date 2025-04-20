"use client";

import { useLocalStorage } from "@/app/hooks/LocalStorage";
import React, { useEffect, useState } from "react";
import styles from "./Variable.module.scss";
import { useTranslations } from "next-intl";

type Variable = {
  key: string;
  value: string;
};

function VariablesComponent() {
  const [variablesStorage, setVariableStorage] = useLocalStorage(
    "variables",
    [],
  );
  const [inputs, setInputs] = useState<Variable[]>([{ key: "", value: "" }]);
  const t = useTranslations("Variables");

  useEffect(() => {
    if (Array.isArray(variablesStorage) && variablesStorage.length > 0) {
      setInputs(variablesStorage);
    }
  }, [variablesStorage]);

  const handleAddVariable = () => {
    setInputs([...inputs, { key: "", value: "" }]);
  };

  const handleRemoveVariable = (index: number) => {
    const newArray = inputs.filter((_, i) => i !== index);
    setInputs(newArray);
    setVariableStorage(newArray);
  };

  const handleVariable = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    if (name !== "key" && name !== "value") return;

    const list = [...inputs];
    list[index] = {
      ...list[index],
      [name]: value,
    };

    setInputs(list);
    setVariableStorage(list);
  };

  return (
    <div className={styles.variablesWrapper}>
      <button
        onClick={handleAddVariable}
        type="button"
        className={styles.addButton}
      >
        {t("btnAdd")}
      </button>

      {inputs?.map((item: Variable, index: number) => (
        <div className={styles.inputWrapper} key={index}>
          <input
            type="text"
            placeholder={t("key")}
            name="key"
            value={item.key}
            onChange={(e) => handleVariable(e, index)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder={t("value")}
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
            {t("btnDelete")}
          </button>
        </div>
      ))}
    </div>
  );
}

export default VariablesComponent;
