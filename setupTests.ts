import "@testing-library/jest-dom";

if (!window.matchMedia) {
  window.matchMedia = function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  } as any;
}
