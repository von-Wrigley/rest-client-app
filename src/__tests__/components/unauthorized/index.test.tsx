import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Unauthorized from "@/components/unauthorized";

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe("Unauthorized (content only)", () => {
  const t = (key: string) => key;

  it("renders loading skeletons when isLoading is true", () => {
    render(<Unauthorized isLoading={true} t={(key) => key} />);
    const skeletons = screen.getAllByTestId("skeleton");
    expect(skeletons).toHaveLength(3);
  });

  it("renders title, description and home link when isLoading is false", () => {
    render(<Unauthorized isLoading={false} t={t} />);
    expect(screen.getByRole("heading", { name: "title" })).toBeInTheDocument();
    expect(screen.getByText("description")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "homeLink" })).toBeInTheDocument();
  });
});
