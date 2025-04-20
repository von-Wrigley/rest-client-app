import { notFound } from "next/navigation";
import CatchAllPage from "@/app/[locale]/[...rest]/page";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("Not found");
  }),
}));

describe("CatchAllPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call notFound when executed", () => {
    expect(() => CatchAllPage()).toThrow("Not found");
    expect(notFound).toHaveBeenCalledTimes(1);
  });

  it("should not return normally", () => {
    expect(() => CatchAllPage()).toThrow();
  });

  it("should have correct function type", () => {
    const page: () => void = CatchAllPage;
    expect(typeof page).toBe("function");
  });
});

function testTypes() {
  // @ts-expect-error - Verify it can't be used as JSX
  const _invalidUsage = <CatchAllPage />;
}
