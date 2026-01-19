module.exports = {
  preset: "jest-expo",
  testEnvironment: "node",

  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

transformIgnorePatterns: [
  "node_modules/(?!(react-native|@react-native|expo|expo-modules-core|@expo|expo-router|@expo-google-fonts|react-navigation|@react-navigation|@unimodules|unimodules|sentry-expo|native-base|react-native-svg|react-native-safe-area-context|react-native-reanimated)/)"
],

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  moduleNameMapper: {
    "\\.(png|jpg|jpeg|gif|webp)$": "<rootDir>/__mocks__/fileMock.js",
  },
};

