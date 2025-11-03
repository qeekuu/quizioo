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

  content: {
	width: "100%",
    maxWidth: 420,      
  },

	header: {
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

  },

  buttons: {

  },
  button: {

  },

  buttonText: {

  },
});

