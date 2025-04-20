import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpPage from "@/app/[locale]/signup/page";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/helper/supabaseClient", () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

jest.mock("@/components/shared/loader", () => ({
  __esModule: true,
  default: ({ isLoading, t }: any) =>
    isLoading ? <div>{t("loading")}...</div> : null,
}));

jest.mock("@/components/signup-form", () => ({
  __esModule: true,
  default: (props: any) => (
    <form onSubmit={props.onSubmit} data-testid="signup-form">
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
      {props.successMessage && <p>{props.successMessage}</p>}
    </form>
  ),
}));

describe("SignUpPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("shows loader initially", () => {
    render(<SignUpPage />);
    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("renders SignUpForm after 500ms", () => {
    render(<SignUpPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
  });

  it("updates form data on input change", () => {
    render(<SignUpPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    const emailInput = screen.getByPlaceholderText("email");
    fireEvent.change(emailInput, { target: { value: "new@example.com" } });

    expect(emailInput).toHaveValue("new@example.com");
  });

  it("shows error message if sign-up fails", async () => {
    const { supabase } = require("@/helper/supabaseClient");
    supabase.auth.signUp.mockResolvedValue({
      data: null,
      error: { message: "Email already registered" },
    });

    render(<SignUpPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "123456" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Email already registered")).toBeInTheDocument();
    });
  });

  it("shows success message if sign-up succeeds", async () => {
    const { supabase } = require("@/helper/supabaseClient");
    supabase.auth.signUp.mockResolvedValue({
      data: { user: { id: "123" } },
      error: null,
    });

    render(<SignUpPage />);
    act(() => {
      jest.advanceTimersByTime(500);
    });

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "new@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Check your email for confirmation!")
      ).toBeInTheDocument();
    });
  });
});
