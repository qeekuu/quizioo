
jest.mock("expo-image", () => ({
  Image: "Image",
}));

jest.mock("expo-router", () => ({
  useNavigation: () => ({ navigate: jest.fn(), reset: jest.fn() }),
  Link: ({ children }) => children,
}));

jest.mock("expo-image", () => ({
  Image: "Image",
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("expo-router", () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock("@react-navigation/native", () => {
  const actual = jest.requireActual("@react-navigation/native");
  return {
    ...actual,
    useNavigation: () => ({ navigate: jest.fn(), reset: jest.fn(), goBack: jest.fn() }),
    useRoute: () => ({ params: {} }),
  };
});

