import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#778899",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#708090",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  buttons: {
    alignSelf: "stretch",
    gap: 16, // jeśli krzyczy, użyj rowGap: 16
  },
  button: {
    backgroundColor: "#2F4F4F",
    borderBlockColor: "#ccc",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#2F4F4F",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

