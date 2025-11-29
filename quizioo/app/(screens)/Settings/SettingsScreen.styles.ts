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

  /*TOP BAR */
  topBar: {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: 20,
  },
	
  settingLabel: {
	fontSize: 22,
	letterSpacing: 1,
	color: colors.text,
	fontWeight: "700",
	marginTop: 8,
  },

});
