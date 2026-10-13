module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
