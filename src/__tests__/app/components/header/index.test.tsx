import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/app/components/header";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock("../../../../app/components/locale-switcher", () => () => (
  <div>LocaleSwitcher</div>
));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/helper/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Header component", () => {
  const mockSession = {
    user: { id: "1", email: "test@example.com" },
  };

  beforeEach(() => {
    jest.useFakeTimers();
    const { supabase } = require("@/helper/supabaseClient");
    supabase.auth.getSession.mockResolvedValue({
      data: { session: null },
    });
    supabase.auth.onAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    });
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe("Loading state", () => {
    it("renders skeleton loader initially", () => {
      const { container } = render(<Header />);
      expect(screen.queryByTestId("header")).not.toBeInTheDocument();
      expect(container.querySelector(".headerSkeleton")).toBeInTheDocument();
    });
  });

  describe("Authenticated state", () => {
    beforeEach(() => {
      const { supabase } = require("@/helper/supabaseClient");
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
      });
    });

    it("renders authenticated navigation links after loading", async () => {
      render(<Header />);
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByText("collections")).toBeInTheDocument();
      expect(screen.getByText("history")).toBeInTheDocument();
      expect(screen.getByText("variables")).toBeInTheDocument();
      expect(screen.getByText("signOut")).toBeInTheDocument();
    });
  });

  describe("Unauthenticated state", () => {
    it("renders sign in and sign up links after loading", async () => {
      render(<Header />);
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "signIn" })).toHaveAttribute(
        "href",
        "/signin",
      );
      expect(screen.getByRole("link", { name: "signUp" })).toHaveAttribute(
        "href",
        "/signup",
      );
    });
  });

  describe("Common elements", () => {
    it("renders logo and locale switcher", async () => {
      render(<Header />);
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(
        screen.getByRole("img", { name: /Course Logo/i }),
      ).toBeInTheDocument();
      expect(screen.getByText("LocaleSwitcher")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "title" })).toHaveAttribute(
        "href",
        "/",
      );
    });

    it("displays RSS logo with correct src", async () => {
      render(<Header />);
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      const image = screen.getByRole("img", { name: /Course Logo/i });
      expect(image).toHaveAttribute("src", "/rss-logo.svg");
    });
  });

  describe("Sticky behavior", () => {
    it("adds sticky class when scrolled past 50px", async () => {
      render(<Header />);
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      const header = screen.getByTestId("header");
      expect(header).not.toHaveClass("sticky");

      Object.defineProperty(window, "scrollY", {
        writable: true,
        value: 100,
      });

      act(() => {
        window.dispatchEvent(new Event("scroll"));
      });

      expect(header).toHaveClass("sticky");
    });
  });

  describe("Sign out", () => {
    beforeEach(() => {
      const { supabase } = require("@/helper/supabaseClient");
      supabase.auth.getSession.mockResolvedValue({
        data: { session: mockSession },
      });
    });

    it("calls signOut when sign out button is clicked", async () => {
      const { supabase } = require("@/helper/supabaseClient");
      render(<Header />);
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      const signOutButton = screen.getByText("signOut");
      act(() => {
        signOutButton.click();
      });

      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });
});
