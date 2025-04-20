import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Skeleton from "@/app/components/skeleton";

jest.mock("./index.module.scss", () => ({
  skeleton: "skeleton",
  small: "small",
  medium: "medium",
  large: "large",
}));

describe("Skeleton", () => {
  it("renders with default medium variant", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveClass("skeleton", "medium");
  });

  it("renders with small variant", () => {
    const { container } = render(<Skeleton variant="small" />);
    expect(container.firstChild).toHaveClass("skeleton", "small");
  });

  it("renders with large variant", () => {
    const { container } = render(<Skeleton variant="large" />);
    expect(container.firstChild).toHaveClass("skeleton", "large");
  });

  it("accepts additional className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
