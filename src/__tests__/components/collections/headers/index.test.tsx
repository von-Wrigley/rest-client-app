import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectedReducer from "@/app/redux/ContentSelected";
import Headers from "@/components/collections/headers";

const TEST_STRINGS = {
  KEY_PLACEHOLDER: "key",
  VALUE_PLACEHOLDER: "value",
  ADD_BUTTON: "btnAdd",
  DELETE_BUTTON: "btnDelete",
  TEST_HEADER: {
    name: "Authorization",
    value: "Bearer token",
  },
  UPDATED_HEADER: {
    name: "Content-Type",
    value: "application/json",
  },
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

describe("Headers component", () => {
  it("renders with one empty input by default", () => {
    renderWithRedux(<Headers />, { headers: [] });

    expect(
      screen.getByPlaceholderText(TEST_STRINGS.KEY_PLACEHOLDER),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(TEST_STRINGS.VALUE_PLACEHOLDER),
    ).toBeInTheDocument();
  });

  it("renders with saved headers", () => {
    renderWithRedux(<Headers />, {
      headers: [TEST_STRINGS.TEST_HEADER],
    });

    expect(
      screen.getByDisplayValue(TEST_STRINGS.TEST_HEADER.name),
    ).toBeInTheDocument();
  });

  it("adds a new header input field", () => {
    renderWithRedux(<Headers />, { headers: [] });

    const addButton = screen.getByRole("button", {
      name: TEST_STRINGS.ADD_BUTTON,
    });
    fireEvent.click(addButton);

    const inputs = screen.getAllByPlaceholderText(TEST_STRINGS.KEY_PLACEHOLDER);
    expect(inputs.length).toBe(2);
  });

  it("removes a header input field", () => {
    renderWithRedux(<Headers />, {
      headers: [TEST_STRINGS.TEST_HEADER],
    });

    const deleteButton = screen.getByRole("button", {
      name: TEST_STRINGS.DELETE_BUTTON,
    });
    fireEvent.click(deleteButton);

    expect(
      screen.queryByDisplayValue(TEST_STRINGS.TEST_HEADER.name),
    ).not.toBeInTheDocument();
  });

  it("updates header values and dispatches changes", () => {
    const { store } = renderWithRedux(<Headers />, { headers: [] });

    const nameInput = screen.getByPlaceholderText(TEST_STRINGS.KEY_PLACEHOLDER);
    const valueInput = screen.getByPlaceholderText(
      TEST_STRINGS.VALUE_PLACEHOLDER,
    );

    fireEvent.change(nameInput, {
      target: { value: TEST_STRINGS.UPDATED_HEADER.name },
    });
    fireEvent.change(valueInput, {
      target: { value: TEST_STRINGS.UPDATED_HEADER.value },
    });

    const actions = store.getState().selected.selectedContent.headers;
    expect(actions).toEqual([TEST_STRINGS.UPDATED_HEADER]);
  });
});
