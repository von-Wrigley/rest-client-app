"use client";
import { render, screen, act, waitFor } from "@testing-library/react";
import Footer from "../app/components/Footer/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders GitHub link, current year, and course logo after loading", async () => {
    act(() => {
      render(<Footer />);
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const githubLink = screen.getByRole("link", { name: /GitHub Link/i });
    expect(githubLink).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    const yearText = screen.getByText(new RegExp(currentYear));
    expect(yearText).toBeInTheDocument();

    const courseLogo = screen.getByAltText(/Course Logo/i);
    expect(courseLogo).toBeInTheDocument();
  });
});
