"use client";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import NotFound from "@/app/pages/not-found";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("NotFound Page", () => {
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
    render(<NotFound />);
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
