import { renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";

jest.mock("next/navigation");
jest.mock("@/helper/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
    },
  },
}));

const mockRouterPush = jest.fn();
const mockGetSession = jest.fn();

describe("useAuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    require("@/helper/supabaseClient").supabase.auth.getSession =
      mockGetSession;
  });

  it("should set isLoading to false when user is authenticated", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { user: { id: "123" } } },
    });

    const { result, rerender } = renderHook(() => useAuthGuard());
    expect(result.current).toBe(true);
    await new Promise(process.nextTick);
    rerender();
    expect(result.current).toBe(false);
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("should redirect to unauthorized when user is not authenticated", async () => {
    mockGetSession.mockResolvedValue({
      data: { session: null },
    });

    const { result, rerender } = renderHook(() => useAuthGuard());
    expect(result.current).toBe(true);
    await new Promise(process.nextTick);
    rerender();
    expect(result.current).toBe(true);
    expect(mockRouterPush).toHaveBeenCalledWith("/unauthorized");
  });

  it("should handle auth check error", async () => {
    mockGetSession.mockRejectedValue(new Error("Auth check failed"));
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const { result, rerender } = renderHook(() => useAuthGuard());
    expect(result.current).toBe(true);
    await new Promise(process.nextTick);
    rerender();
    expect(result.current).toBe(true);
    expect(mockRouterPush).toHaveBeenCalledWith("/unauthorized");
    expect(consoleError).toHaveBeenCalled();

    consoleError.mockRestore();
  });
});
