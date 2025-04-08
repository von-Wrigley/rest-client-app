"use client";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Unauthorized from "@/app/pages/unauthorized";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Unauthorized Page", () => {
  it("renders title, description, and home link", () => {
    render(<Unauthorized />);

    const heading = screen.getByRole("heading", { name: "title" });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText("description");
    expect(description).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: "homeLink" });
    expect(homeLink).toBeInTheDocument();
  });
});
