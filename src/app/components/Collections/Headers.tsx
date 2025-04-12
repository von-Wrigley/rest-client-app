"use client";
import React, { useEffect, useState } from "react";
import Form from "next/form";
import { usePathname, useSearchParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { selectedHeaders } from "@/app/redux/ContentSelected";
import { useParams } from "next/navigation";
type inputsDispatch = {
  key: string;
  value: string;
};

function Headers() {
  const [inputs, setInputs] = useState<inputsDispatch[]>([
    { key: "", value: "" },
  ]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const params = useParams();
  let inputfromhistory = params.slug?.[0];
  let inputURLHistory = params.slug?.[1];

  console.log(params.slug);
  const stateMethod = useAppSelector(
    (state) => state.selected.selectedContent,
  ).method;
  const bodyReq = useAppSelector(
    (state) => state.selected.selectedContent,
  ).bodyReq;
  const EndpointURL = useAppSelector(
    (state) => state.selected.selectedContent,
  ).inputURL;

  const handleAddHeader = () => {
    setInputs([...inputs, { key: "", value: "" }]);
  };
  const handleRemoveHeader = (index: number) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  useEffect(() => {
    let newInp = [];

    inputs.map((x) => newInp.push({ name: x.key, value: x.value }));

    //  let clone = structuredClone(inputs)
    dispatch(selectedHeaders(newInp));
  }, [inputs]);

  const handleHeader = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const list = [...inputs];

    list[index][name] = value;
    setInputs(list);

    const params = new URLSearchParams(searchParams);
    const createQueryString = (inputs) => {
      return inputs.map((x) => {
        if (x.key && x.value) {
          params.set(encodeURI(x.key), encodeURI(x.value));
          return params.toString();
        } else {
          return params.delete(x.key);
        }
      });
    };

    //  router.push(pathname + '?' + createQueryString(inputs))
    window.history.pushState(
      window.history.state,
      "",
      pathname +
        (stateMethod.length > 0 ? "/" + stateMethod : "") +
        (EndpointURL.length > 0 ? "/" + EndpointURL : "") +
        (bodyReq.length > 0 ? "/" + bodyReq : "") +
        "?" +
        createQueryString(inputs),
    );
  };

  //
  // window.history.pushState(
  //   window.history.state,
  //   '',
  //   pathname + '/'+ createQueryString(newArr, newArr2)
  // );

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
              name="key"
              value={item.key}
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
