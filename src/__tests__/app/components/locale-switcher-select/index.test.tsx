import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocaleSwitcherSelect from "@/app/components/locale-switcher-select";

jest.mock("@/i18n/navigation", () => ({
  usePathname: () => "/about",
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt ?? "image"} />;
});

const mockLocales = [
  { value: "en", label: "English", flagSrc: "/flags/en.png" },
  { value: "ru", label: "Russian", flagSrc: "/flags/ru.png" },
  { value: "de", label: "Deutsch", flagSrc: "/flags/de.png" },
];

describe("LocaleSwitcherSelect", () => {
  it("renders the current locale", () => {
    render(<LocaleSwitcherSelect defaultValue="ru" children={mockLocales} />);
    expect(screen.getByText("Russian")).toBeInTheDocument();
    expect(screen.getByAltText("Russian")).toBeInTheDocument();
  });

  it("opens dropdown on button click", () => {
    render(<LocaleSwitcherSelect defaultValue="en" children={mockLocales} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Russian")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  it("calls router.replace on option click", () => {
    const replaceMock = jest.fn();
    jest.spyOn(require("@/i18n/navigation"), "useRouter").mockReturnValue({
      replace: replaceMock,
    });

    render(<LocaleSwitcherSelect defaultValue="en" children={mockLocales} />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Deutsch"));

    expect(replaceMock).toHaveBeenCalledWith(
      { pathname: "/about" },
      { locale: "de" },
    );
  });

  it("closes dropdown when clicking outside", () => {
    render(<LocaleSwitcherSelect defaultValue="en" children={mockLocales} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Russian")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Russian")).not.toBeInTheDocument();
  });
});
