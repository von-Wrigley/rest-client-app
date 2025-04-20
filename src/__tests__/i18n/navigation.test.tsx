import { createNavigation } from "next-intl/navigation";
import * as Navigation from "../../i18n/navigation";
import { routing } from "../../i18n/routing";

jest.mock("next-intl/navigation", () => ({
  createNavigation: jest.fn(() => ({
    Link: "MockLink",
    redirect: jest.fn(),
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    getPathname: jest.fn(),
  })),
}));

jest.mock("../../i18n/routing", () => ({
  routing: { routes: ["mock"] },
}));

describe("navigation module", () => {
  it("should call createNavigation with routing", () => {
    expect(createNavigation).toHaveBeenCalledWith(routing);
  });

  it("should export mocked navigation helpers", () => {
    expect(Navigation.Link).toBe("MockLink");
    expect(typeof Navigation.redirect).toBe("function");
    expect(typeof Navigation.usePathname).toBe("function");
    expect(typeof Navigation.useRouter).toBe("function");
    expect(typeof Navigation.getPathname).toBe("function");
  });
});
