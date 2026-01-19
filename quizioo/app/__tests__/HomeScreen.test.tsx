/**
 * HomeScreen.test.tsx
 *
 * Ten plik zawiera testy jednostkowo-integracyjne ekranu HomeScreen.
 *
 * Zakres testów:
 *
 * 1) Test stanu OFFLINE
 *    - Symuluje brak połączenia z internetem (NetworkContext: isOnline = false)
 *    - Sprawdza, czy wyświetlany jest komunikat „Offline mode – no internet connection”
 *    - Weryfikuje, że aplikacja NIE próbuje pobierać listy quizów z API
 *      (api.listQuizzesHome nie zostaje wywołane)
 *
 * 2) Test stanu ONLINE
 *    - Symuluje aktywne połączenie z internetem (isOnline = true)
 *    - Mockuje odpowiedź API z listą quizów
 *    - Sprawdza, czy:
 *        • funkcja api.listQuizzesHome została wywołana
 *        • pobrane quizy są poprawnie wyrenderowane na ekranie
 *
 * Dodatkowe informacje techniczne:
 *
 * - Zależności natywne (Ionicons, Image, Avatar) są mockowane, aby testy
 *   nie zależały od środowiska mobilnego.
 * - useFocusEffect z react-navigation jest zastąpione useEffect,
 *   aby uniknąć pętli renderów w środowisku testowym.
 * - NetworkContext, AppContext oraz API są w pełni mockowane,
 *   dzięki czemu testy nie wykonują prawdziwych zapytań sieciowych.
 *
 * Cel:
 * - Zweryfikować poprawne zachowanie HomeScreen w zależności od stanu sieci
 * - Sprawdzić logikę ładowania quizów bez testowania implementacji backendu
 */

import React from "react";
import { Alert } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import HomeScreen from "@/app/(screens)/home/HomeScreen";

jest.spyOn(Alert, "alert").mockImplementation(() => {});

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "Ionicons",
}));

jest.mock("expo-image", () => ({
  Image: "Image",
}));

jest.mock("@/app/(screens)/components/Avatar", () => ({
  Avatar: "Avatar",
}));

const mockUseAuth = jest.fn();
jest.mock("@/app/(context)/AppContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockUseNetwork = jest.fn();
jest.mock("@/app/(context)/NetworkContext", () => ({
  useNetwork: () => mockUseNetwork(),
}));

// --- API ---
const mockListQuizzesHome = jest.fn();
jest.mock("@/app/(api)/client", () => ({
  api: {
    listQuizzesHome: (...args: any[]) => mockListQuizzesHome(...args),
  },
}));

jest.mock("@/app/(utils)/recentQuiz", () => ({
  loadRecentQuiz: async () => null,
}));

jest.mock("@react-navigation/native", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Link: ({ children }: any) => React.createElement(Text, null, children),
    useNavigation: () => ({ navigate: jest.fn() }),
    useRoute: () => ({ params: {} }),

    useFocusEffect: (cb: any) => {
      React.useEffect(() => {
        const cleanup = cb?.();
        return cleanup;
      }, [cb]);
    },
  };
});

describe("HomeScreen (network + quizzes list)", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({
      state: { user: { username: "admin", avatarUri: undefined } },
    });
  });

  it("OFFLINE: shows banner and does not call listQuizzesHome", () => {
    mockUseNetwork.mockReturnValue({ isOnline: false });

    const { getByText } = render(<HomeScreen />);

    expect(getByText("Offline mode – no internet connection")).toBeTruthy();
    expect(mockListQuizzesHome).not.toHaveBeenCalled();
  });

  it("ONLINE: calls listQuizzesHome and renders quizzes", async () => {
    mockUseNetwork.mockReturnValue({ isOnline: true });

    mockListQuizzesHome.mockResolvedValueOnce([
      {
        id: 1,
        quizName: "Quiz A",
        quizType: "General",
        correctPoints: 1,
        incorrectPoints: -1,
        questions: [],
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        quizName: "Quiz B",
        quizType: "Geography",
        correctPoints: 1,
        incorrectPoints: -1,
        questions: [],
        createdAt: new Date().toISOString(),
      },
    ]);

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => expect(mockListQuizzesHome).toHaveBeenCalledTimes(1));

    expect(getByText("Quiz A")).toBeTruthy();
    expect(getByText("Quiz B")).toBeTruthy();
  });
});

