"use client";
import { render, screen, act } from "@testing-library/react";
import HomePage from "../app/page";
import "@testing-library/jest-dom";

describe("HomePage Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders skeleton placeholders initially", () => {
    act(() => {
      render(<HomePage />);
    });
    expect(screen.queryByRole("heading", { name: /Welcome!/i })).toBeNull();
  });

  it("renders actual content after loading delay", async () => {
    act(() => {
      render(<HomePage />);
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const heading = await screen.findByRole("heading", { name: /Welcome!/i });
    expect(heading).toBeInTheDocument();

    const description = screen.getByText(
      /This REST client application allows you to test any API, manage request history, and work with variables./i
    );
    expect(description).toBeInTheDocument();

    const signInLink = screen.getByRole("link", { name: /Sign In/i });
    expect(signInLink).toBeInTheDocument();

    const signUpLink = screen.getByRole("link", { name: /Sign Up/i });
    expect(signUpLink).toBeInTheDocument();
  });
});
