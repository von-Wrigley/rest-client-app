import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import selectedReducer from "@/app/redux/ContentSelected";
import * as fetcherUtils from "@/app/utils/fetcher";
import BtnSend from "@/components/collections/send-btn";

const TEST_DATA = {
  MOCK_RESPONSE: { message: "success" },
  JSON_RESPONSE: { foo: "bar" },
  VARIABLES: [{ key: "id", value: "123" }],
  URLS: {
    SIMPLE: btoa("https://example.com"),
    WITH_VARIABLE: btoa("https://api.com/users/{{id}}"),
    TEST_ENDPOINT: btoa("https://api.com/test"),
  },
  METHODS: {
    GET: "GET",
    POST: "POST",
  },
  HEADERS: [
    {
      name: "Authorization",
      value: "Bearer token",
    },
  ],
  BODY: '{"key":"value"}',
  STATUS: {
    CODE: 200,
    TEXT: "OK",
  },
  UI: {
    BUTTON_NAME: "btnSend",
  },
};

// Mocks
jest.mock("@/app/hooks/LocalStorage", () => {
  const mockSetReqHistory = jest.fn();
  const mockSetResponseStorage = jest.fn();

  return {
    __esModule: true,
    useLocalStorage: (key: string) => {
      switch (key) {
        case "variables":
          return [TEST_DATA.VARIABLES, jest.fn()];
        case "country":
          return [[], mockSetReqHistory];
        case "req":
          return [[], mockSetResponseStorage];
        default:
          return [[], jest.fn()];
      }
    },
    __mocks__: {
      mockSetReqHistory,
      mockSetResponseStorage,
    },
  };
});

jest.mock("next-intl", () => ({
  useTranslations: () => () => TEST_DATA.UI.BUTTON_NAME,
}));

jest.mock("@/app/utils/fetcher", () => ({
  fetcher: jest.fn(),
}));

const {
  __mocks__: { mockSetReqHistory, mockSetResponseStorage },
} = require("@/app/hooks/LocalStorage");

const createTestStore = (preloadedState: any) => {
  return configureStore({
    reducer: {
      selected: selectedReducer,
    },
    preloadedState: {
      selected: {
        selectedContent: preloadedState,
      },
    },
  });
};

const renderWithStore = (preloadedState: any) => {
  const store = createTestStore(preloadedState);
  return render(
    <Provider store={store}>
      <BtnSend />
    </Provider>,
  );
};

describe("BtnSend Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("displays the send button", () => {
      renderWithStore({
        method: TEST_DATA.METHODS.GET,
        inputURL: TEST_DATA.URLS.SIMPLE,
        bodyReq: "",
        headers: [],
      });

      expect(
        screen.getByRole("button", { name: TEST_DATA.UI.BUTTON_NAME }),
      ).toBeInTheDocument();
    });
  });

  describe("API Interaction", () => {
    it("makes correct API call and updates state on success", async () => {
      (fetcherUtils.fetcher as jest.Mock).mockResolvedValue({
        data: TEST_DATA.MOCK_RESPONSE,
        resOk: true,
        status: TEST_DATA.STATUS.CODE,
        statusText: TEST_DATA.STATUS.TEXT,
      });

      renderWithStore({
        method: TEST_DATA.METHODS.GET,
        inputURL: TEST_DATA.URLS.WITH_VARIABLE,
        bodyReq: "",
        headers: TEST_DATA.HEADERS,
      });

      fireEvent.click(
        screen.getByRole("button", { name: TEST_DATA.UI.BUTTON_NAME }),
      );

      await waitFor(() => {
        expect(fetcherUtils.fetcher).toHaveBeenCalledWith({
          url: "/api/collections/https://api.com/users/123",
          method: TEST_DATA.METHODS.GET,
          headers: {
            "X-Custom-Headers": JSON.stringify(TEST_DATA.HEADERS),
          },
        });

        expect(mockSetReqHistory).toHaveBeenCalled();
        expect(mockSetResponseStorage).toHaveBeenCalledWith(
          TEST_DATA.MOCK_RESPONSE,
        );
      });
    });
  });

  describe("Response Handling", () => {
    it("properly formats JSON responses", async () => {
      (fetcherUtils.fetcher as jest.Mock).mockResolvedValue({
        data: TEST_DATA.JSON_RESPONSE,
        resOk: true,
        status: TEST_DATA.STATUS.CODE,
        statusText: TEST_DATA.STATUS.TEXT,
      });

      renderWithStore({
        method: TEST_DATA.METHODS.POST,
        inputURL: TEST_DATA.URLS.TEST_ENDPOINT,
        bodyReq: TEST_DATA.BODY,
        headers: [],
      });

      fireEvent.click(
        screen.getByRole("button", { name: TEST_DATA.UI.BUTTON_NAME }),
      );

      await waitFor(() => {
        expect(mockSetResponseStorage).toHaveBeenCalledWith(
          TEST_DATA.JSON_RESPONSE,
        );
      });
    });
  });
});
