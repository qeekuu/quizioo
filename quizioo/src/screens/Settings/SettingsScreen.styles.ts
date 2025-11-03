import { StyleSheet } from "react-native";

export const colors = {
  background: "#0E1422",
  surface: "#141B2C",
  primary: "#17B9C4",
  onPrimary: "#FFFFFF",
  text: "#F8FAFC",
  textMuted: "#A3ADC2",
  textPlaceholder: "#6B7280",
  stroke: "#2B3248",
  inputBg: "#111826",
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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

  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    maxWidth: 520,
    alignSelf: "center",
    width: "100%",
  },

  title: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: 1,
    textShadowColor: colors.surface,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 30,
	textAlign: "center",
  },
  input: {
	backgroundColor: colors.inputBg,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: colors.inputBg,
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    color: colors.text,
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
    backgroundColor: colors.background,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: "600",
  },
});

