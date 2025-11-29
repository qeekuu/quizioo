import { StyleSheet } from "react-native";

export const colors = {
  background: "#0E1422",
  surface: "#141B2C",
  primary: "#fd86d4",
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
	  backgroundColor: colors.background 
  },
  logo: { 
	  width: 180, 
	  height: 180, 
	  alignSelf: "center", 
	  marginTop: 12, 
	  marginBottom: 8 
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

  h1: { 
	  fontSize: 24, 
	  fontWeight: "700", 
	  color: colors.text 
  },

  sub: { 
	  fontSize: 14, 
	  color: colors.textMuted, 
	  marginTop: -4, 
	  marginBottom: 8 
  },

  field: { 
	  marginTop: 8 
  },

  label: { 
	  color: colors.textMuted, 
	  fontSize: 13, 
	  marginBottom: 6 },

  input: {
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.stroke,
    borderRadius: 16,
    height: 52,
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 16,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    borderWidth: 1,
    borderColor: colors.stroke,
    borderRadius: 16,
    height: 52,
    paddingLeft: 16,
    paddingRight: 12,
  },
  inputFlex: { 
	  flex: 1, 
	  color: colors.text, 
	  fontSize: 16 
  },

  toggle: { 
	  color: colors.textMuted, 
	  fontWeight: "600" 
  },

  forgot: { 
	  alignSelf: "flex-end", 
	  marginTop: 8 
  },

  forgotText: { 
	  color: colors.textMuted, 
	  fontSize: 13 
  },

  button: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { 
	  color: colors.onPrimary, 
	  fontSize: 16, 
	  fontWeight: "700" 
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  bottomText: { 
	  color: colors.textMuted 
  },

  link: { 
	  color: colors.primary, 
	  fontWeight: "700" 
  },
});
