import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import selectedReducer, { addInputURL } from "@/app/redux/ContentSelected";
import EndpointURL from "@/components/collections/endpoint-url";

const TEST_URLS = {
  INITIAL: "https://example.com",
  TEST: "https://test.com",
  NEW: "https://new.com",
  API: "https://api.com",
};

const encodeURL = (url: string) => encodeURIComponent(btoa(url));
const getInitialState = (url: string) => ({
  selected: {
    selectedContent: {
      inputURL: encodeURL(url),
    },
  },
});

const createTestStore = (preloadedState?: any) =>
  configureStore({
    reducer: combineReducers({
      selected: selectedReducer,
    }),
    preloadedState,
  });

const renderWithRedux = (
  component: React.ReactElement,
  preloadedState?: any,
) => {
  const store = createTestStore(preloadedState);
  return {
    store,
    ...render(<Provider store={store}>{component}</Provider>),
  };
};

describe("EndpointURL", () => {
  it("renders input with decoded initial value", () => {
    renderWithRedux(<EndpointURL />, getInitialState(TEST_URLS.INITIAL));

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(TEST_URLS.INITIAL);
  });

  it("updates input value on change", () => {
    renderWithRedux(<EndpointURL />, getInitialState(TEST_URLS.TEST));

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: TEST_URLS.NEW } });
    expect(input).toHaveValue(TEST_URLS.NEW);
  });

  it("dispatches addInputURL with encoded value on input change", () => {
    const store = createTestStore(getInitialState(TEST_URLS.TEST));
    jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <EndpointURL />
      </Provider>,
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: TEST_URLS.API } });

    expect(store.dispatch).toHaveBeenCalledWith(
      addInputURL(btoa(TEST_URLS.API)),
    );
  });
});
