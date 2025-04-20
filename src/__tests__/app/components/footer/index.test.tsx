import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/app/components/footer";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Footer component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("contains creation year (2025)", () => {
    render(<Footer />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText("© 2025")).toBeInTheDocument();
  });

  it("has three GitHub links with correct hrefs", () => {
    render(<Footer />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const allLinks = screen.getAllByRole("link");
    const githubLinks = allLinks.filter((link) =>
      link.getAttribute("href")?.startsWith("https://github.com/"),
    );
    expect(githubLinks).toHaveLength(3);
    expect(githubLinks[0]).toHaveAttribute("href", "https://github.com/lionna");
    expect(githubLinks[1]).toHaveAttribute(
      "href",
      "https://github.com/von-Wrigley",
    );
    expect(githubLinks[2]).toHaveAttribute(
      "href",
      "https://github.com/CROCIATOFAF",
    );
  });
});
