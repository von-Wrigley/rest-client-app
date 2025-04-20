import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UnauthorizedPage from "@/app/[locale]/unauthorized/page";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("UnauthorizedPage (container)", () => {
  it("renders content immediately without showing skeletons", () => {
    render(<UnauthorizedPage />);

    expect(screen.getByRole("heading", { name: "title" })).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "homeLink" })).toBeInTheDocument();
  });
});
