import { StyleSheet } from "react-native";

export const colors = {
  bg: "#0F172A",            // tło
  surface: "rgba(15,23,42,0.55)", // półprzezroczysta powierzchnia
  border: "rgba(148,163,184,0.35)", // obrys 
  textPrimary: "#E2E8F0",   // tekst główny 
  textMuted: "#94A3B8",     // tekst pomocniczy 
  inputBg: "rgba(241, 245, 249, 0.08)",       // pole wprowadzania 
  inputBorder: "rgba(226, 232, 240, 0.35)",   // obramowanie inputu 
  primary: "#0EA5B7",       // przycisk in
  primaryPressed: "#0891B2",// wariant wciśnięty 
  secondary: "#4F46E5",     // przycisk up
  textPlaceholder: "CBD5E1", // placeholder
  white: "#FFFFFF",
  shadow: "#000000",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  frame: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	padding: 20,
  },
  content: {
	width: "100%",
    maxWidth: 420,      
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: 1,
    textShadowColor: colors.inputBorder,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 30,
	textAlign: "center",
  },
  input: {
	backgroundColor: colors.inputBg,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: colors.inputBorder,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    color: colors.textPrimary,
    fontSize: 16,
  },
  buttons: {
    alignSelf: "stretch",
    gap: 16, 
  },
  button: {
    backgroundColor: colors.primary,
    borderBlockColor: "#000",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
