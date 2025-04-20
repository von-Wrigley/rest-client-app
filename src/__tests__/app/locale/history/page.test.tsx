import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HistoryPage from "@/app/[locale]/history/page";

jest.mock("../../../../components/shared/auth-guard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-guard">{children}</div>
  ),
}));

jest.mock("../../../../components/history", () => ({
  __esModule: true,
  default: () => <div data-testid="history-component">History Component</div>,
}));

describe("HistoryPage", () => {
  it("renders without crashing", async () => {
    render(await HistoryPage());
    expect(screen.getByTestId("auth-guard")).toBeInTheDocument();
  });

  it("contains the AuthGuard wrapper", async () => {
    render(await HistoryPage());
    const authGuard = screen.getByTestId("auth-guard");
    expect(authGuard).toBeInTheDocument();
  });

  it("renders the History component inside AuthGuard", async () => {
    render(await HistoryPage());
    const authGuard = screen.getByTestId("auth-guard");
    const historyComponent = screen.getByTestId("history-component");
    expect(authGuard).toContainElement(historyComponent);
  });

  it("has proper suspense boundaries", async () => {
    render(
      <React.Suspense fallback={<div>Test Loading...</div>}>
        {await HistoryPage()}
      </React.Suspense>,
    );

    expect(screen.getByTestId("history-component")).toBeInTheDocument();
  });
});
