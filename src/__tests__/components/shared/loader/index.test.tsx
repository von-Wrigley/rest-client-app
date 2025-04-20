import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "@/components/shared/loader";

describe("Loader", () => {
  it("calls translation function and renders loading text when isLoading is true", () => {
    const mockT = jest.fn().mockImplementation((key) => `${key}`);
    render(<Loader isLoading={true} t={mockT} />);

    expect(mockT).toHaveBeenCalledWith("loading");

    expect(screen.getByText("loading...")).toBeInTheDocument();
  });

  it("renders nothing and does not call t when isLoading is false", () => {
    const mockT = jest.fn().mockImplementation((key) => `${key}`);
    const { container } = render(<Loader isLoading={false} t={mockT} />);

    expect(container).toBeEmptyDOMElement();
    expect(mockT).not.toHaveBeenCalled();
  });
});
