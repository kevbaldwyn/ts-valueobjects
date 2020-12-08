module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageReporters: ["json-summary", "text", "lcov"],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
