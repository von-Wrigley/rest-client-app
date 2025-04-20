import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectedReducer from "@/app/redux/ContentSelected";
import GenerateCodeRequest from "@/components/collections/generate-code-request";

const MOCK_URL = "https://api.example.com";
const MOCK_ENCODED_URL = btoa(MOCK_URL);
const MOCK_GET_REQUEST = {
  method: "GET",
  inputURL: MOCK_ENCODED_URL,
  headers: [],
  bodyReq: "",
};
const MOCK_POST_REQUEST = {
  method: "POST",
  inputURL: MOCK_ENCODED_URL,
  headers: [{ Authorization: "Bearer token" }],
  bodyReq: '{"key":"value"}',
};
const MOCK_SHELL_CODE = "curl https://api.example.com";
const MOCK_PYTHON_CODE = "generated code";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockConvert = jest.fn();
jest.mock("@readme/httpsnippet", () => ({
  HTTPSnippet: jest.fn().mockImplementation(() => ({
    convert: mockConvert,
  })),
}));

const renderWithRedux = (ui: React.ReactElement, state: any) => {
  const store = configureStore({
    reducer: combineReducers({
      selected: selectedReducer,
    }),
    preloadedState: {
      selected: {
        selectedContent: state,
      },
    },
  });

  return render(<Provider store={store}>{ui}</Provider>);
};

describe("GenerateCodeRequest", () => {
  beforeEach(() => {
    mockConvert.mockReset();
  });

  it("renders dropdown and textarea", () => {
    renderWithRedux(<GenerateCodeRequest />, MOCK_GET_REQUEST);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Snippet")).toBeInTheDocument();
  });

  it("updates selected language and calls convert", async () => {
    mockConvert.mockReturnValue(MOCK_SHELL_CODE);

    renderWithRedux(<GenerateCodeRequest />, MOCK_GET_REQUEST);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "shell" } });

    await waitFor(() => {
      expect(mockConvert).toHaveBeenCalledWith("shell", "curl");
      expect(screen.getByRole("textbox")).toHaveValue(MOCK_SHELL_CODE);
    });
  });

  it("handles request with headers and body", async () => {
    mockConvert.mockReturnValue(MOCK_PYTHON_CODE);

    renderWithRedux(<GenerateCodeRequest />, MOCK_POST_REQUEST);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "python" },
    });

    await waitFor(() => {
      expect(mockConvert).toHaveBeenCalledWith("python", "requests");
      expect(screen.getByRole("textbox")).toHaveValue(MOCK_PYTHON_CODE);
    });
  });

  it("does not call convert if selected language is null", () => {
    renderWithRedux(<GenerateCodeRequest />, MOCK_GET_REQUEST);

    expect(mockConvert).not.toHaveBeenCalled();
  });
});
