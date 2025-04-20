import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "@/app/redux/ContentSelected";
import BodyEditor from "@/components/collections/body-editor";

const TEST_STRINGS = {
  PLACEHOLDER: "BodyPlaceholder",
  DEFAULT_FORMAT: "JSON",
  ALT_FORMAT: "TEXT",
  TEST_JSON: '{"key":"value"}',
  TEST_JSON_MINIFIED: '{"a":1}',
  TEST_JSON_BEAUTIFIED: `{
    "a": 1
}`,
  BEAUTIFY_BUTTON: /Beautify/i,
};

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        selected: selectedReducer,
      },
      preloadedState,
    }),
  } = {} as any,
) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe("BodyEditor", () => {
  it("renders textarea and select input", () => {
    renderWithRedux(<BodyEditor />);

    expect(
      screen.getByPlaceholderText(TEST_STRINGS.PLACEHOLDER),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(TEST_STRINGS.DEFAULT_FORMAT),
    ).toBeInTheDocument();
  });

  it("allows changing select input", () => {
    renderWithRedux(<BodyEditor />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: TEST_STRINGS.ALT_FORMAT } });
    expect(select).toHaveValue(TEST_STRINGS.ALT_FORMAT);
  });

  it("updates textarea value on change", () => {
    renderWithRedux(<BodyEditor />);
    const textarea = screen.getByPlaceholderText(TEST_STRINGS.PLACEHOLDER);
    fireEvent.change(textarea, { target: { value: TEST_STRINGS.TEST_JSON } });
    expect(textarea).toHaveValue(TEST_STRINGS.TEST_JSON);
  });

  it("shows Beautify button only when input is JSON and not empty", () => {
    renderWithRedux(<BodyEditor />);
    const textarea = screen.getByPlaceholderText(TEST_STRINGS.PLACEHOLDER);

    fireEvent.change(textarea, {
      target: { value: TEST_STRINGS.TEST_JSON_MINIFIED },
    });
    expect(
      screen.getByRole("button", { name: TEST_STRINGS.BEAUTIFY_BUTTON }),
    ).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: "" } });
    expect(
      screen.queryByRole("button", { name: TEST_STRINGS.BEAUTIFY_BUTTON }),
    ).not.toBeInTheDocument();
  });

  it("beautifies JSON on Beautify button click", () => {
    renderWithRedux(<BodyEditor />);
    const textarea = screen.getByPlaceholderText(TEST_STRINGS.PLACEHOLDER);
    fireEvent.change(textarea, {
      target: { value: TEST_STRINGS.TEST_JSON_MINIFIED },
    });

    const button = screen.getByRole("button", {
      name: TEST_STRINGS.BEAUTIFY_BUTTON,
    });
    fireEvent.click(button);

    expect(textarea).toHaveValue(TEST_STRINGS.TEST_JSON_BEAUTIFIED);
  });
});
