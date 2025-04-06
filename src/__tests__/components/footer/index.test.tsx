import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/app/components/footer";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Footer component", () => {
  it("renders without crashing", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("contains creation year (2025)", () => {
    render(<Footer />);
    expect(screen.getByText("© 2025")).toBeInTheDocument();
  });

  it("has correct GitHub link", () => {
    render(<Footer />);
    const githubLink = screen.getByRole("link", { name: "github" });
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/von-Wrigley/rest-client-app",
    );
  });
});
