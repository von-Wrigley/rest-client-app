import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  testPathIgnorePatterns: ["<rootDir>/src/i18n/", "<rootDir>/node_modules/"],

  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["node_modules/(?!(next-intl)/)"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
};

export default createJestConfig(config);
