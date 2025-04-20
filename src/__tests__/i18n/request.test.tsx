jest.mock("next-intl/server", () => ({
  getRequestConfig: (fn: any) => fn,
}));

jest.mock("next-intl", () => ({
  hasLocale: jest.fn(),
}));

jest.mock("../../i18n/routing", () => ({
  routing: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
}));

describe("getRequestConfig", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns config with supported locale", async () => {
    const { hasLocale } = await import("next-intl");
    (hasLocale as unknown as jest.Mock).mockReturnValue(true);

    const getRequestConfig = (await import("../../i18n/request")).default;

    const result = await getRequestConfig({
      requestLocale: Promise.resolve("ru"),
    });

    expect(result.locale).toBe("ru");
    expect(result.messages).toBeDefined();
    expect(result.messages?.HomePage?.title).toBe("Добро пожаловать!");
    expect(result.messages?.Header?.signOut).toBe("Выход");
  });

  it("returns config with supported locale 'en'", async () => {
    const { hasLocale } = await import("next-intl");
    (hasLocale as unknown as jest.Mock).mockReturnValue(true);

    const getRequestConfig = (await import("../../i18n/request")).default;

    const result = await getRequestConfig({
      requestLocale: Promise.resolve("en"),
    });

    expect(result.locale).toBe("en");
    expect(result.messages).toBeDefined();
    expect(result.messages?.HomePage?.title).toBe("Welcome!");
    expect(result.messages?.Header?.signOut).toBe("Sign Out");
  });

  it("returns config with default locale if unsupported", async () => {
    const { hasLocale } = await import("next-intl");
    (hasLocale as unknown as jest.Mock).mockReturnValue(false);

    const getRequestConfig = (await import("../../i18n/request")).default;

    const result = await getRequestConfig({
      requestLocale: Promise.resolve("fr"),
    });

    expect(result.locale).toBe("en");
    expect(result.messages).toBeDefined();
    expect(result.messages?.HomePage?.title).toBe("Welcome!");
    expect(result.messages?.Header?.signOut).toBe("Sign Out");
  });
});
