import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "@/app/redux/ContentSelected";
import ResponseBody from "@/components/collections/response-body";

const renderWithStore = (preloadedState: any) => {
  const store = configureStore({
    reducer: {
      selected: selectedReducer,
    },
    preloadedState: {
      selected: {
        selectedContent: preloadedState,
      },
    },
  });

  return render(
    <Provider store={store}>
      <ResponseBody />
    </Provider>,
  );
};

describe("ResponseBody", () => {
  it("renders success status and body text", () => {
    const bodyText = JSON.stringify({ message: "Success" }, null, 2);
    const state = {
      bodyRes: bodyText,
      details: [
        {
          resOk: true,
          resStatus: 200,
          statusText: "OK",
        },
      ],
    };

    renderWithStore(state);

    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue(bodyText);
  });

  it("renders error status with fallback statusText", () => {
    const state = {
      bodyRes: "Some error",
      details: [
        {
          resOk: false,
          resStatus: 404,
          statusText: undefined,
        },
      ],
    };

    renderWithStore(state);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Not Found")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("Some error");
  });

  it("renders nothing in textarea if bodyRes is empty", () => {
    const state = {
      bodyRes: "",
      details: [],
    };

    renderWithStore(state);

    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
