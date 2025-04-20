import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },

  transformIgnorePatterns: ["/node_modules/(?!(next-intl)/)"],

  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],


};

export default createJestConfig(config);
