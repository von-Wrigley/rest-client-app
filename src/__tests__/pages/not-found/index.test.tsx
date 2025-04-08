"use client";
import { render, screen } from "@testing-library/react";
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
  it("renders title, description, and home link", () => {
    render(<NotFound />);

    const heading = screen.getByRole("heading", { name: "title" });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText("description");
    expect(description).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "homeLink" });
    expect(homeLink).toBeInTheDocument();
  });
});
