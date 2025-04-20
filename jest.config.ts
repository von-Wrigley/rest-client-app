import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",

  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(scss|css|sass)$": "identity-obj-proxy",
  },
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
};

export default createJestConfig(config);
