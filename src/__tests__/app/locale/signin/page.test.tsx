import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInPage from "@/app/[locale]/signin/page";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/helper/supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

jest.mock("@/components/shared/loader", () => ({
  __esModule: true,
  default: ({ isLoading, t }: any) =>
    isLoading ? <div>{t("loading")}...</div> : null,
}));

jest.mock("@/components/signin-form", () => ({
  __esModule: true,
  default: (props: any) => (
    <form onSubmit={props.onSubmit}>
      <input
        name="email"
        placeholder="email"
        value={props.formData.email}
        onChange={props.onChange}
      />
      <input
        name="password"
        placeholder="password"
        value={props.formData.password}
        onChange={props.onChange}
      />
      <button type="submit">submit</button>
      {props.authError && <p>{props.authError}</p>}
    </form>
  ),
}));

describe("SignInPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows loader initially", () => {
    render(<SignInPage />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("renders SignInForm after 500ms", () => {
    render(<SignInPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("updates form data on input change", () => {
    render(<SignInPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    const emailInput = screen.getByPlaceholderText("email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("shows error message if login fails", async () => {
    const { supabase } = require("@/helper/supabaseClient");
    supabase.auth.signInWithPassword.mockResolvedValue({
      error: { message: "Invalid credentials" },
    });

    render(<SignInPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("redirects to /collections on successful login", async () => {
    const { supabase } = require("@/helper/supabaseClient");
    supabase.auth.signInWithPassword.mockResolvedValue({ error: null });

    render(<SignInPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/collections");
    });
  });
});
