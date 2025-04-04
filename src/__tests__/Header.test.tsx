"use client";
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import Header from "../app/components/Header/Header";
import "@testing-library/jest-dom";

describe("Header Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders logo, language toggle, and auth links after loading", async () => {
    act(() => {
      render(<Header />);
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const header = await screen.findByTestId("header");
    expect(header).toBeInTheDocument();

    const logo = screen.getByRole("link", { name: /Postman Clone/i });
    expect(logo).toBeInTheDocument();

    const langToggle = screen.getByRole("button", { name: /EN/i });
    expect(langToggle).toBeInTheDocument();

    const signInLink = screen.getByRole("link", { name: /Sign In/i });
    expect(signInLink).toBeInTheDocument();

    const signUpLink = screen.getByRole("link", { name: /Sign Up/i });
    expect(signUpLink).toBeInTheDocument();
  });

  it("applies sticky styles on scroll after loading", async () => {
    act(() => {
      render(<Header />);
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const header = await screen.findByTestId("header");
    expect(header).not.toHaveClass("sticky");

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(header).toHaveClass("sticky");
    });
  });
});
