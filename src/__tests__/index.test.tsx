import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/pages";

describe("Home Page", () => {
  test("renders the welcome heading and full description", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { name: /Welcome!/i });
    expect(heading).toBeInTheDocument();

    const descriptionRegex =
      /This REST client application allows you to test any API,\s*manage request history,\s*and work with variables\./i;
    const description = screen.getByText(descriptionRegex);
    expect(description).toBeInTheDocument();
  });

  test("renders authentication links in the welcome section", () => {
    render(<Home />);
    const welcomeSection = screen.getByTestId("welcome-section");
    const signInLink = within(welcomeSection).getByRole("link", {
      name: /Sign In/i,
    });
    const signUpLink = within(welcomeSection).getByRole("link", {
      name: /Sign Up/i,
    });
    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });
});
