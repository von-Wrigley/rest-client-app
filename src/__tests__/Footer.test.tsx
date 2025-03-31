"use client";

import { render, screen } from "@testing-library/react";
import Footer from "../app/components/Footer/Footer";
import "@testing-library/jest-dom";

describe("Footer Component", () => {
  it("renders GitHub link, current year, and course logo", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /GitHub Link/i });
    expect(githubLink).toBeInTheDocument();

    const currentYear = new Date().getFullYear().toString();
    const yearText = screen.getByText(new RegExp(currentYear));
    expect(yearText).toBeInTheDocument();

    const courseLogo = screen.getByAltText(/Course Logo/i);
    expect(courseLogo).toBeInTheDocument();
  });
});
