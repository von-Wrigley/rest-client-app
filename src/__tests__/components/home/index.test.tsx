"use client";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { WelcomeSection } from "@/components/home";
import { useRouter } from "next/navigation";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockPush = jest.fn();
const defaultRouterData = {
  basePath: "http://127.0.0.1:3000",
  push: mockPush,
  refresh: jest.fn(),
  asPath: "/",
  query: {},
};
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
(useRouter as jest.Mock).mockReturnValue(defaultRouterData);

jest.mock("@/helper/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({
        data: {
          session: null,
        },
      }),
      onAuthStateChange: jest.fn().mockReturnValue({
        data: {
          subscription: {
            unsubscribe: jest.fn(),
          },
        },
      }),
      signOut: jest.fn().mockResolvedValue(undefined),
    },
  },
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

  it("renders correctly with all elements after loading", async () => {
    const { asFragment } = render(<WelcomeSection />);

    expect(await screen.findByRole("heading", { level: 2 })).toHaveTextContent(
      "title",
    );
    expect(screen.getByText("description")).toBeInTheDocument();

    const signInButton = screen.getByRole("link", { name: "signIn" });
    expect(signInButton).toHaveAttribute("href", "/signin");

    const signUpButton = screen.getByRole("link", { name: "signUp" });
    expect(signUpButton).toHaveAttribute("href", "/signup");
    expect(asFragment()).toMatchSnapshot();
  });
});
