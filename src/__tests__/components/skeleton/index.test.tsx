import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Skeleton from "@/app/components/skeleton";

describe("Skeleton component", () => {
  it("renders with default variant (medium) and the expected class names", () => {
    const { container } = render(<Skeleton />);
    const skeletonDiv = container.firstChild;

    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv).toHaveClass("skeleton");
    expect(skeletonDiv).toHaveClass("medium");
  });

  it("renders with variant 'small' and the expected class names", () => {
    const { container } = render(<Skeleton variant="small" />);
    const skeletonDiv = container.firstChild;

    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv).toHaveClass("skeleton");
    expect(skeletonDiv).toHaveClass("small");
  });

  it("appends an additional className if provided", () => {
    const additionalClass = "extra-class";
    const { container } = render(<Skeleton className={additionalClass} />);
    const skeletonDiv = container.firstChild;

    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv).toHaveClass("skeleton");
    expect(skeletonDiv).toHaveClass("medium");
    expect(skeletonDiv).toHaveClass(additionalClass);
  });
});
