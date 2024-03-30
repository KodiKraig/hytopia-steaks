/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/dist/"],
  runner: "groups",
  setupFilesAfterEnv: ["./jest.setup.js"],
}
