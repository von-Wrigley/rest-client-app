import { render, screen } from "@testing-library/react";
import History from "../../../components/history";
import { useLocalStorage } from "@/app/hooks/LocalStorage";

jest.mock("@/app/hooks/LocalStorage", () => ({
  useLocalStorage: jest.fn().mockReturnValue([[]]),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn().mockImplementation(() => (key: string) => key),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("History Component", () => {
  const mockRoutes = [
    {
      date: "2025-04-20T12:00:00Z",
      method: "GET",
      urlCode: "example",
      body: "test body",
      headers: "test headers",
      input: "test input",
    },
    {
      date: "2025-04-21T10:30:00Z",
      method: "POST",
      urlCode: "another-example",
      body: "another body",
      headers: "another headers",
      input: "another input",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Empty State", () => {
    beforeEach(() => {
      (useLocalStorage as jest.Mock).mockReturnValue([[]]);
      render(<History />);
    });

    it("should display 'noRequest' message when no routes are available", () => {
      expect(screen.getByText("noRequest")).toBeInTheDocument();
    });

    it("should display 'Collections' header", () => {
      expect(screen.getByText("Collections")).toBeInTheDocument();
    });

    it("should not display any route items", () => {
      expect(screen.queryByTestId("history-item")).not.toBeInTheDocument();
    });
  });

  describe("With Routes", () => {
    beforeEach(() => {
      (useLocalStorage as jest.Mock).mockReturnValue([mockRoutes]);
      render(<History />);
    });

    it("should display 'lastRequest' header when routes exist", () => {
      expect(screen.getByText("lastRequest")).toBeInTheDocument();
    });

    it("should display correct number of route items", () => {
      const items = screen.getAllByText(/GET|POST/);
      expect(items).toHaveLength(mockRoutes.length);
    });

    it("should format dates correctly", () => {
      expect(screen.getByText(/20\.04\.2025 14:00/)).toBeInTheDocument();
      expect(screen.getByText(/21\.04\.2025 12:30/)).toBeInTheDocument();
    });

    it("should display method and input for each route", () => {
      expect(screen.getByText("GET test input")).toBeInTheDocument();
      expect(screen.getByText("POST another input")).toBeInTheDocument();
    });

    it("should generate correct links for each route", () => {
      const links = screen.getAllByRole("link");
      expect(links[0]).toHaveAttribute("href", "/collections");
      expect(links[1]).toHaveAttribute("href", "/collections");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty route properties", () => {
      const emptyRoute = {
        date: "",
        method: "",
        urlCode: "",
        body: "",
        headers: "",
        input: "",
      };
      (useLocalStorage as jest.Mock).mockReturnValue([[emptyRoute]]);
      render(<History />);

      expect(screen.getByText("NaN.NaN.NaN NaN:NaN")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/collections");
    });

    it("should handle special characters in route properties", () => {
      const specialCharRoute = {
        date: "2025-04-20T12:00:00Z",
        method: "GET",
        urlCode: "special#chars",
        body: "{'json': true}",
        headers: "content-type: application/json",
        input: "/api/data?param=value",
      };
      (useLocalStorage as jest.Mock).mockReturnValue([[specialCharRoute]]);
      render(<History />);

      expect(screen.getByText("GET /api/data?param=value")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/collections");
    });
  });
});
