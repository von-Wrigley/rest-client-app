"use client";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Unauthorized from "@/components/unauthorized";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Unauthorized Page", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders title, description, and home link after loading", () => {
    render(<Unauthorized />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const heading = screen.getByRole("heading", { name: "title" });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText("description");
    expect(description).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "homeLink" });
    expect(homeLink).toBeInTheDocument();
  });
});
