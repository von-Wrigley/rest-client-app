import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VariablesComponent from "@/app/components/Variables/Variable";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
}));

const mockGet = jest.fn();
const mockSet = jest.fn();

jest.mock("@/app/hooks/LocalStorage", () => ({
  useLocalStorage: (key: string, defaultValue: any) => {
    const stored = mockGet(key);
    return [stored ?? defaultValue, mockSet];
  },
}));

jest.mock("./Variable.module.scss", () => ({
  variablesWrapper: "variablesWrapper",
  addButton: "addButton",
  inputWrapper: "inputWrapper",
  input: "input",
  button: "button",
}));

describe("VariablesComponent", () => {
  beforeEach(() => {
    mockGet.mockReset();
    mockSet.mockReset();
  });

  it("renders with default input", () => {
    render(<VariablesComponent />);
    expect(screen.getByText("translated_btnAdd")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("translated_key")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("translated_value")).toBeInTheDocument();
  });

  it("adds a new variable input", () => {
    render(<VariablesComponent />);
    fireEvent.click(screen.getByText("translated_btnAdd"));
    const inputs = screen.getAllByPlaceholderText("translated_key");
    expect(inputs.length).toBe(2);
  });

  it("removes a variable input", () => {
    render(<VariablesComponent />);
    fireEvent.click(screen.getByText("translated_btnAdd"));
    const removeButtons = screen.getAllByText("translated_btnDelete");
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByText("translated_btnDelete").length).toBe(1);
    expect(mockSet).toHaveBeenCalled();
  });

  it("updates input values and sets to localStorage", () => {
    render(<VariablesComponent />);
    const keyInput = screen.getByPlaceholderText("translated_key");
    fireEvent.change(keyInput, { target: { value: "MY_KEY", name: "key" } });
    expect(keyInput).toHaveValue("MY_KEY");
    expect(mockSet).toHaveBeenCalledWith([{ key: "MY_KEY", value: "" }]);
  });

  it("loads data from localStorage on mount", () => {
    mockGet.mockReturnValue([{ key: "foo", value: "bar" }]);
    render(<VariablesComponent />);
    expect(screen.getByDisplayValue("foo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("bar")).toBeInTheDocument();
  });
});
