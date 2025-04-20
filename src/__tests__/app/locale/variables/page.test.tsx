import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VariablesPage from "@/app/[locale]/variables/page";

jest.mock("../../../../components/shared/auth-guard", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-guard">{children}</div>
  ),
}));

jest.mock("../../../../components/variables", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="variables-component">Variables Component</div>
  ),
}));

describe("VariablesPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    render(await VariablesPage());
    expect(screen.getByTestId("auth-guard")).toBeInTheDocument();
  });

  it("wraps the Variables component with AuthGuard", async () => {
    render(await VariablesPage());

    const authGuard = screen.getByTestId("auth-guard");
    const variablesComponent = screen.getByTestId("variables-component");

    expect(authGuard).toContainElement(variablesComponent);
  });

  it("has proper suspense boundaries structure", async () => {
    const { container } = render(await VariablesPage());
    const outerSuspense = container.firstChild;
    expect(outerSuspense).toBeInTheDocument();
    const authGuard = screen.getByTestId("auth-guard");
    expect(authGuard).toBeInTheDocument();
    const variablesComponent = screen.getByTestId("variables-component");
    expect(variablesComponent).toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    const { asFragment } = render(await VariablesPage());
    expect(asFragment()).toMatchSnapshot();
  });
});
