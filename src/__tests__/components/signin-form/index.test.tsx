import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInForm from "@/components/signin-form";

describe("SignInForm", () => {
  const mockT = (key: string) => key;
  const defaultProps = {
    t: mockT,
    formData: { email: "", password: "" },
    onChange: jest.fn(),
    onSubmit: jest.fn((e) => e.preventDefault()),
    isValidEmail: true,
    authError: "",
  };

  it("renders all form fields and labels", () => {
    render(<SignInForm {...defaultProps} />);

    expect(screen.getByRole("heading", { name: "title" })).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "submit" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "homeLink" })).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    render(<SignInForm {...defaultProps} />);

    const emailInput = screen.getByLabelText("email");
    fireEvent.change(emailInput, { target: { value: "user@example.com" } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("calls onSubmit when form is submitted", () => {
    render(
      <SignInForm {...defaultProps} formData={{ email: "a", password: "b" }} />
    );
    const form = screen.getByTestId("signin-form");
    fireEvent.submit(form);
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it("shows email validation error if isValidEmail is false", () => {
    render(<SignInForm {...defaultProps} isValidEmail={false} />);
    expect(screen.getByText("invalidEmail")).toBeInTheDocument();
  });

  it("shows authentication error if authError is provided", () => {
    render(<SignInForm {...defaultProps} authError="Invalid credentials" />);
    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("disables submit button if form is invalid", () => {
    render(<SignInForm {...defaultProps} />);
    const button = screen.getByRole("button", { name: "submit" });
    expect(button).toHaveClass("buttonDisabled");
  });

  it("enables submit button if form is valid", () => {
    render(
      <SignInForm
        {...defaultProps}
        formData={{ email: "test@example.com", password: "password" }}
        isValidEmail={true}
      />
    );
    const button = screen.getByRole("button", { name: "submit" });
    expect(button).toHaveClass("button");
  });
});
