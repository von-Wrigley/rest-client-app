"use client";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WelcomeSection } from "@/components/home";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("WelcomeSection component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders correctly with all elements after loading", () => {
    render(<WelcomeSection />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "title",
    );
    expect(screen.getByText("description")).toBeInTheDocument();

    const signInButton = screen.getByRole("link", { name: "signIn" });
    expect(signInButton).toHaveAttribute("href", "/signin");

    const signUpButton = screen.getByRole("link", { name: "signUp" });
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  it("matches snapshot after loading", () => {
    const { asFragment } = render(<WelcomeSection />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
