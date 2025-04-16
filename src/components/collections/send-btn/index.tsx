"use client";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import React from "react";
import { addBodyRes, resContentDetails } from "@/app/redux/ContentSelected";
import { useLocalStorage } from "@/app/hooks/LocStor";

function BtnSend() {
  const dispatch = useAppDispatch();

  const [variablestorage] = useLocalStorage("variables", []);
  const [storage, setStorage] = useLocalStorage("country", []);
  const [responseStorage, setResponseStorage] = useLocalStorage("req", []);
  const dt = new Date();

  const stateMethod = useAppSelector(
    (state) => state.selected.selectedContent,
  ).method;
  const inputState = useAppSelector(
    (state) => state.selected.selectedContent,
  ).inputURL;
  const bodyPost = useAppSelector(
    (state) => state.selected.selectedContent,
  ).bodyReq;
  const headers = useAppSelector(
    (state) => state.selected.selectedContent,
  ).headers;

  let normalURL = atob(inputState);

  const handlerequest = async () => {
    const provewithoutVariables = variablestorage.map((x) =>
      normalURL.includes(x.key),
    );

    if (provewithoutVariables) {
      const newX = variablestorage.map((x) => {
        const newstr = normalURL.replace(
          new RegExp("\{\{(?:\\s+)?(" + x.key + ")(?:\\s+)?\}\}"),
          x.value,
        );
        normalURL = newstr;

        return normalURL;
      });
    }

    if (stateMethod === "GET") {
      console.log(normalURL);
      const res = await fetch(`/api/collections/${normalURL}`, {
        headers: {
          Authorization: "EFfw2342",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });

      if (typeof window !== "undefined") {
        setStorage([
          ...storage,
          {
            method: stateMethod,
            input: normalURL,
            date: dt,
            urlCode: inputState,
            body: bodyPost,
            headers: { ...headers },
          },
        ]);
      }

      console.log(res);
      const x = await res.json();

      dispatch(resContentDetails([{ resOk: res.ok, resStatus: res.status }]));

      const res2 = JSON.stringify(res);

      setResponseStorage(res);

      const responseBody = JSON.stringify(x);
      hanfleFormater(responseBody);
    } else if (stateMethod === "DELETE") {
      if (typeof window !== "undefined") {
        setStorage([
          ...storage,
          {
            method: stateMethod,
            input: normalURL,
            date: dt,
            urlCode: inputState,
            body: bodyPost,
            headers: headers,
          },
        ]);
      }
      const res = await fetch(`/api/collections/${normalURL}`, {
        method: "DELETE",
      });

      const x = await res.json();
      console.log(x);
      dispatch(addBodyRes("{}"));
      dispatch(resContentDetails([{ resOk: res.ok, resStatus: res.status }]));
    } else if (stateMethod === "POST") {
      if (typeof window !== "undefined") {
        setStorage([
          ...storage,
          {
            method: stateMethod,
            input: normalURL,
            date: dt,
            urlCode: inputState,
            body: bodyPost,
            headers: headers,
          },
        ]);
      }
      const res = await fetch(`/api/collections/${normalURL}`, {
        method: "POST",
        body: JSON.stringify(bodyPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const x = await res.json();
      console.log(x);
      hanfleFormater(JSON.stringify(x));
      dispatch(resContentDetails([{ resOk: res.ok, resStatus: res.status }]));
    } else if (stateMethod === "PUT") {
      if (typeof window !== "undefined") {
        setStorage([
          ...storage,
          {
            method: stateMethod,
            input: normalURL,
            date: dt,
            urlCode: inputState,
            body: bodyPost,
            headers: headers,
          },
        ]);
      }
      const res = await fetch(`/api/collections/${normalURL}`, {
        method: "PUT",
        body: JSON.stringify(bodyPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      const x = await res.json();
      hanfleFormater(JSON.stringify(x));
    } else if (stateMethod === "PATCH") {
      if (typeof window !== "undefined") {
        setStorage([
          ...storage,
          {
            method: stateMethod,
            input: normalURL,
            date: dt,
            urlCode: inputState,
            body: bodyPost,
          },
        ]);
      }
      const res = await fetch(`/api/collections/${normalURL}`, {
        method: "PATCH",
        body: JSON.stringify(bodyPost),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      const x = await res.json();
      hanfleFormater(JSON.stringify(x));
      dispatch(resContentDetails([{ resOk: res.ok, resStatus: res.status }]));
    }
  };

  const hanfleFormater = (x: string) => {
    if (
      stateMethod === "GET" ||
      stateMethod === "POST" ||
      stateMethod === "DELETE" ||
      stateMethod === "PUT" ||
      stateMethod === "PATCH"
    ) {
      const test1 = JSON.stringify(JSON.parse(x), null, 4);
      dispatch(addBodyRes(test1));
    }
  };

  return (
    <button type="submit" className="bg-blue-100 p-4" onClick={handlerequest}>
      Send
    </button>
  );
}

export default BtnSend;
