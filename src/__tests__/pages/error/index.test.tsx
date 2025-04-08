"use client";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorPage from "@/app/error";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Error Page", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("renders 500 error message and reset button", () => {
    const dummyError = new Error("Dummy error");
    const resetFn = jest.fn();
    render(<ErrorPage error={dummyError} reset={resetFn} />);

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
