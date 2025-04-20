jest.mock("next-intl/routing", () => ({
    defineRouting: jest.fn(() => ({
      locales: ["en", "de", "ru", "ka", "pl"],
      defaultLocale: "en",
      href: jest.fn(),
      route: jest.fn(),
      localePrefix: jest.fn(),
    })),
  }));
  
  describe("routing", () => {
    it("has correct locales and defaultLocale", async () => {
      const { routing } = await import("../../i18n/routing");
  
      expect(routing.locales).toEqual(["en", "de", "ru", "ka", "pl"]);
      expect(routing.defaultLocale).toBe("en");
    });
  
    it("includes utility functions", async () => {
      const { routing } = await import("../../i18n/routing");
  
      expect(typeof (routing as any).href).toBe("function");
      expect(typeof (routing as any).route).toBe("function");
      expect(typeof (routing as any).localePrefix).toBe("function");
    });
  });
  