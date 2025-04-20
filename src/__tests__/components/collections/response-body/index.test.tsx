import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectedReducer from "@/app/redux/ContentSelected";
import Headers from "@/components/collections/headers";

const TEST_HEADERS = {
  EMPTY: [],
  SINGLE: [{ Authorization: "Bearer token" }],
  UPDATED: [{ name: "Content-Type", value: "application/json" }],
};

const UI_TEXT = {
  KEY_PLACEHOLDER: "key",
  VALUE_PLACEHOLDER: "value",
  ADD_BUTTON: "btnAdd",
  DELETE_BUTTON: "btnDelete",
  AUTHORIZATION: "Authorization",
  BEARER_TOKEN: "Bearer token",
  CONTENT_TYPE: "Content-Type",
  APP_JSON: "application/json",
};

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const renderWithRedux = (ui: React.ReactElement, preloadedState: any) => {
  const store = configureStore({
    reducer: combineReducers({
      selected: selectedReducer,
    }),
    preloadedState: {
      selected: {
        selectedContent: preloadedState,
      },
    },
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe("Headers Component", () => {
  describe("Initial Rendering", () => {
    it("shows empty key/value inputs when no headers exist", () => {
      renderWithRedux(<Headers />, { headers: TEST_HEADERS.EMPTY });

      expect(
        screen.getByPlaceholderText(UI_TEXT.KEY_PLACEHOLDER),
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText(UI_TEXT.VALUE_PLACEHOLDER),
      ).toBeInTheDocument();
    });

    it("displays existing headers when provided", () => {
      renderWithRedux(<Headers />, { headers: TEST_HEADERS.SINGLE });

      expect(
        screen.getByDisplayValue(UI_TEXT.AUTHORIZATION),
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(UI_TEXT.BEARER_TOKEN),
      ).toBeInTheDocument();
    });
  });

  describe("Header Management", () => {
    it("adds new header fields when clicking add button", () => {
      renderWithRedux(<Headers />, { headers: TEST_HEADERS.EMPTY });

      fireEvent.click(screen.getByRole("button", { name: UI_TEXT.ADD_BUTTON }));
      const inputs = screen.getAllByPlaceholderText(UI_TEXT.KEY_PLACEHOLDER);

      expect(inputs.length).toBe(2);
    });

    it("removes header fields when clicking delete button", () => {
      renderWithRedux(<Headers />, { headers: TEST_HEADERS.SINGLE });

      fireEvent.click(
        screen.getByRole("button", { name: UI_TEXT.DELETE_BUTTON }),
      );

      expect(
        screen.queryByDisplayValue(UI_TEXT.AUTHORIZATION),
      ).not.toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    it("updates store when header values change", () => {
      const { store } = renderWithRedux(<Headers />, {
        headers: TEST_HEADERS.EMPTY,
      });

      fireEvent.change(screen.getByPlaceholderText(UI_TEXT.KEY_PLACEHOLDER), {
        target: { value: UI_TEXT.CONTENT_TYPE },
      });
      fireEvent.change(screen.getByPlaceholderText(UI_TEXT.VALUE_PLACEHOLDER), {
        target: { value: UI_TEXT.APP_JSON },
      });

      const stateHeaders = store.getState().selected.selectedContent.headers;
      expect(stateHeaders).toEqual(TEST_HEADERS.UPDATED);
    });
  });
});
