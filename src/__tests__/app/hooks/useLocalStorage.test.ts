import { useLocalStorage } from "@/app/hooks/LocalStorage";
import { renderHook, act } from "@testing-library/react";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return initial value if no value in localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", []));
    const [value] = result.current;
    expect(value).toEqual([]);
  });

  it("should retrieve existing value from localStorage", () => {
    const testValue = { a: 1, b: 2 };
    window.localStorage.setItem("testKey", JSON.stringify(testValue));

    const { result } = renderHook(() => useLocalStorage("testKey", []));
    const [value] = result.current;
    expect(value).toEqual(testValue);
  });

  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", []));

    const newValue = ["item1", "item2"];
    act(() => {
      const [, setValue] = result.current;
      setValue(newValue);
    });

    expect(window.localStorage.getItem("testKey")).toEqual(
      JSON.stringify(newValue),
    );
    expect(result.current[0]).toEqual(newValue);
  });

  it("should handle null values from localStorage", () => {
    window.localStorage.setItem("testKey", "null");

    const { result } = renderHook(() => useLocalStorage("testKey", []));
    const [value] = result.current;
    expect(value).toEqual([]);
  });
});
