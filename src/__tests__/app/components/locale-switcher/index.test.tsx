import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocaleSwitcher from "@/app/components/locale-switcher";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
  useLocale: () => "en",
}));

jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "fr", "de"],
  },
}));

jest.mock("@/app/components/locale-switcher-select", () => ({
  __esModule: true,
  default: ({ defaultValue, children }: any) => (
    <div>
      <p>Default Locale: {defaultValue}</p>
      <ul>
        {children.map((item: any) => (
          <li key={item.value}>
            {item.label} ({item.value}) - {item.flagSrc}
          </li>
        ))}
      </ul>
    </div>
  ),
}));

describe("LocaleSwitcher", () => {
  it("renders with default locale and options", () => {
    render(<LocaleSwitcher />);

    expect(screen.getByText("Default Locale: en")).toBeInTheDocument();
    expect(
      screen.getByText("translated_locales.en (en) - /flags/en.png"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("translated_locales.de (de) - /flags/de.png"),
    ).toBeInTheDocument();
  });
});
