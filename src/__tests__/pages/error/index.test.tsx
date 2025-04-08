"use client";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorPage from "@/app/error";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Error Page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders 500 error message and reset button after loading", () => {
    const dummyError = new Error("Dummy error");
    const resetFn = jest.fn();
    render(<ErrorPage error={dummyError} reset={resetFn} />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const heading = screen.getByRole("heading", {
      name: /500 - Server Error/i,
    });
    expect(heading).toBeInTheDocument();

    const paragraph = screen.getByText(/Something went wrong on our end/i);
    expect(paragraph).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /Try again/i });
    expect(button).toBeInTheDocument();
  });
});
