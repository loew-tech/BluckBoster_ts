module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
