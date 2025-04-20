import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthGuard from "@/components/shared/auth-guard";

jest.mock("@/app/hooks/useAuthGuard", () => ({
  useAuthGuard: jest.fn(),
}));

const mockedUseAuthGuard = require("@/app/hooks/useAuthGuard").useAuthGuard;
describe("AuthGuard", () => {
  it("renders loader when useAuthGuard returns true", () => {
    mockedUseAuthGuard.mockReturnValue(true);

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("renders children when useAuthGuard returns false", () => {
    mockedUseAuthGuard.mockReturnValue(false);

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
