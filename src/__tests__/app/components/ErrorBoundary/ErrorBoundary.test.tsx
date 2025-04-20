import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBoundary from "@/app/components/ErrorBoundary/ErrorBoundary";

jest.mock("@/app/error", () => ({
  __esModule: true,
  default: ({ error, reset }: any) => (
    <div>
      <p>Custom Error Page</p>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  ),
}));

describe("ErrorBoundary", () => {
  it("renders children when there's no error", () => {
    render(
      <ErrorBoundary>
        <p>Hello World</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders error page when error is thrown", () => {
    const ProblemChild = () => {
      throw new Error("Test Error");
    };

    // suppress expected error log in test output
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Custom Error Page")).toBeInTheDocument();
    expect(screen.getByText("Test Error")).toBeInTheDocument();

    (console.error as jest.Mock).mockRestore();
  });
});
