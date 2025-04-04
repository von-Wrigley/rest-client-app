import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/app/components/header";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("../../../app/components/locale-switcher", () => () => (
  <div>LocaleSwitcher</div>
));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Header component", () => {
  it("renders header with correct structure", () => {
    render(<Header />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Course Logo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("LocaleSwitcher")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "title" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "signIn" })).toHaveAttribute(
      "href",
      "/signin",
    );
    expect(screen.getByRole("link", { name: "signUp" })).toHaveAttribute(
      "href",
      "/signup",
    );
  });

  it("displays RSS logo with correct src", () => {
    render(<Header />);
    const image = screen.getByRole("img", { name: /Course Logo/i });
    expect(image).toHaveAttribute("src", "/rss-logo.svg");
  });
});
