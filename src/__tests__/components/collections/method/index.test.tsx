import Method from "@/components/collections/method";
import { fireEvent, render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { HttpMethod } from "@/app/types/http";
import { addMethod } from "@/app/redux/ContentSelected";
import { useAppDispatch } from "@/app/redux/hooks";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/app/redux/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/app/redux/ContentSelected", () => ({
  addMethod: jest.fn(),
}));

describe("Method Componeent", () => {
  const mockT = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockT.mockImplementation((key) => {
      const translations: Record<string, string> = {
        SelectMethod: "Select Method",
      };
      return translations[key];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders default option in select", () => {
    render(<Method />);

    const selectComp = screen.getByRole("combobox");
    const defaultOption = screen.getByText("Select Method");

    expect(selectComp).toBeInTheDocument();
    expect(defaultOption).toBeDisabled();
    expect(defaultOption).toHaveValue("");
  });
  it("show current option", () => {
    render(<Method />);

    const selectComp = screen.getByRole("combobox");
    expect(selectComp).toHaveValue("GET");
  });

  it("renders methods as options", () => {
    render(<Method />);

    Object.values(HttpMethod).forEach((x) => {
      expect(screen.getByText(x)).toBeInTheDocument();
    });
  });

  it("dispatch value on Select change", () => {
    render(<Method />);

    const selectComp = screen.getByRole("combobox");
    fireEvent.change(selectComp, { target: { value: "PUT" } });

    expect(addMethod).toHaveBeenCalledWith("PUT");
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it("match snapshot", () => {
    const { asFragment } = render(<Method />);
    expect(asFragment()).toMatchSnapshot();
  });
});
