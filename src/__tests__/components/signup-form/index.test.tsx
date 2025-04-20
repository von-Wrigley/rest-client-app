import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "@/components/signup-form";

describe("SignUpForm", () => {
  const mockT = (key: string) => key;

  const defaultProps = {
    t: mockT,
    formData: { email: "", password: "" },
    onChange: jest.fn(),
    onSubmit: jest.fn((e) => e.preventDefault()),
    isValidEmail: true,
    authError: "",
    successMessage: "",
  };

  it("renders all form fields and text content", () => {
    render(<SignUpForm {...defaultProps} />);

    expect(screen.getByRole("heading", { name: "title" })).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();

    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "homeLink" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "signIn" })).toHaveAttribute("href", "/signin");
    expect(screen.getByText("haveAccount")).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    render(<SignUpForm {...defaultProps} />);
    const emailInput = screen.getByLabelText("email");
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("calls onSubmit when form is submitted", () => {
    render(
      <SignUpForm
        {...defaultProps}
        formData={{ email: "a", password: "b" }}
      />
    );
    const form = screen.getByTestId("signup-form");
    fireEvent.submit(form);
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it("shows email validation error if email is invalid", () => {
    render(<SignUpForm {...defaultProps} isValidEmail={false} />);
    expect(screen.getByText("invalidEmail")).toBeInTheDocument();
  });

  it("shows auth error if provided", () => {
    render(<SignUpForm {...defaultProps} authError="User already exists" />);
    expect(screen.getByText("User already exists")).toBeInTheDocument();
  });

  it("shows success message if provided", () => {
    render(<SignUpForm {...defaultProps} successMessage="Check your email" />);
    expect(screen.getByText("Check your email")).toBeInTheDocument();
  });

  it("disables submit button when form is invalid", () => {
    render(<SignUpForm {...defaultProps} />);
    const button = screen.getByRole("button", { name: "submit" });
    expect(button).toBeDisabled();
  });

  it("enables submit button when form is valid", () => {
    render(
      <SignUpForm
        {...defaultProps}
        formData={{ email: "user@example.com", password: "123456" }}
        isValidEmail={true}
      />
    );
    const button = screen.getByRole("button", { name: "submit" });
    expect(button).not.toBeDisabled();
  });
});
