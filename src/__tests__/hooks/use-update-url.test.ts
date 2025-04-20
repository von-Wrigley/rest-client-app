import { renderHook } from "@testing-library/react";
import { useUpdateUrl } from "../../hooks/use-update-url";

jest.mock("next/navigation", () => ({
  usePathname: () => "/test-path",
}));

jest.mock("../../app/redux/hooks", () => ({
  useAppSelector: jest.fn(),
}));

import { useAppSelector } from "../../app/redux/hooks";

describe("useUpdateUrl", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost:3000/collections",
      },
      writable: true,
    });

    window.history.replaceState = jest.fn();
  });

  it("should update URL correctly with all values provided", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        selected: {
          selectedContent: {
            method: "GET",
            inputURL: "api/test",
            bodyReq: "someBody",
            headers: [
              { name: "Content-Type", value: "application/json" },
              { name: "Authorization", value: "Bearer token" },
            ],
          },
        },
      }),
    );

    renderHook(() => useUpdateUrl());

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "http://localhost:3000/collections/GET/api/test/someBody?Content-Type=application%2Fjson&Authorization=Bearer%20token",
    );
  });

  it("should handle missing optional values gracefully", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        selected: {
          selectedContent: {
            method: "",
            inputURL: "",
            bodyReq: "",
            headers: [],
          },
        },
      }),
    );

    renderHook(() => useUpdateUrl());

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "http://localhost:3000/collections/UNDEFINED",
    );
  });

  it("should ignore headers with empty name", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        selected: {
          selectedContent: {
            method: "POST",
            inputURL: "endpoint",
            bodyReq: "",
            headers: [{ name: "", value: "value" }],
          },
        },
      }),
    );

    renderHook(() => useUpdateUrl());

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "http://localhost:3000/collections/POST/endpoint",
    );
  });
});
