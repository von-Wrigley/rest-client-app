import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/app/components/header";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("../../../app/components/locale-switcher", () => () => (
  <div>LocaleSwitcher</div>
));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("Header component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders the loading state initially (covers loading branch)", () => {
    const { container, unmount } = render(<Header />);
    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
    expect(container.querySelector(".headerSkeleton")).toBeInTheDocument();
    act(() => {
      jest.clearAllTimers();
      unmount();
    });
  });

  it("renders header with correct structure after loading", () => {
    render(<Header />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
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

  it("displays RSS logo with correct src after loading", () => {
    render(<Header />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const image = screen.getByRole("img", { name: /Course Logo/i });
    expect(image).toHaveAttribute("src", "/rss-logo.svg");
  });

  it("adds sticky class on scroll when scrollY > 50 (covers lines 23-24)", () => {
    render(<Header />);
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    const header = screen.getByTestId("header");
    expect(header).not.toHaveClass("sticky");

    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 100,
    });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveClass("sticky");
  });
});
