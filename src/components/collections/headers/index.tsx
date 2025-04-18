"use client";
import React, { useEffect, useState } from "react";
import Form from "next/form";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { selectedHeaders } from "@/app/redux/ContentSelected";
import { useTranslations } from "next-intl";

type HeaderField = {
  name: string;
  value: string;
};

function Headers() {
  const savedHeaders = useAppSelector(
    (state) => state.selected.selectedContent.headers,
  );

  const [headerFields, setHeaderFields] = useState<HeaderField[]>(
    savedHeaders.length > 0 ? savedHeaders : [{ name: "", value: "" }],
  );

  const dispatch = useAppDispatch();

  const handleAddHeader = () => {
    setHeaderFields([...headerFields, { name: "", value: "" }]);
  };

  const handleRemoveHeader = (index: number) => {
    const updatedHeaders = headerFields.filter((_, i) => i !== index);
    setHeaderFields(updatedHeaders);
  };

  const handleHeaderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    const updatedFields = headerFields.map((field, i) =>
      i === index ? { ...field, [name]: value } : field,
    );

    setHeaderFields(updatedFields);
  };

  useEffect(() => {
    dispatch(selectedHeaders(headerFields));
  }, [headerFields, dispatch]);

  const t = useTranslations("Headers");

  return (
    <Form action="">
      <h2>{t("headers")}</h2>
      <div className="flex flex-col gap-y-7">
        <button
          onClick={handleAddHeader}
          type="button"
          className="bg-green-400 w-18"
        >
          {t("btnAdd")}
        </button>

        {headerFields.map((field, index) => (
          <div className="flex gap-x-2" key={index}>
            <input
              type="text"
              placeholder={t("key")}
              name="name"
              value={field.name}
              onChange={(e) => handleHeaderChange(e, index)}
              className="border border-gray-300"
            />
            <input
              type="text"
              placeholder={t("value")}
              name="value"
              value={field.value}
              onChange={(e) => handleHeaderChange(e, index)}
              className="border border-gray-300"
            />
            <button
              type="button"
              onClick={() => handleRemoveHeader(index)}
              className="bg-red-600 p-3"
            >
              {t("btnDelete")}
            </button>
          </div>
        ))}
      </div>
    </Form>
  );
}

export default Headers;
