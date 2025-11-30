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
  bordercolor: "#fd86b4",
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  text: {
	color: colors.text,
  },

  topBar: {
	backgroundColor: colors.background,
	height: 70,
	borderRadius: 10,
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	color: colors.background,
	paddingLeft: 15,
	paddingRight: 15,
	margin: 10,
	marginBottom: 25,
	borderBottomWidth: 7,
	borderBottomColor: colors.bordercolor,
  },

  topBarText: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
  },

  settingsSectionText: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
  },

  settingsSubSectionText: {
	color: colors.textMuted,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 13,
  },

  settingsSection: {
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'row',
	height: 70,
	margin: 10,
	paddingLeft: 25,
	paddingRight: 25,
	borderRadius: 25,
	borderWidth: 5,
	borderColor: colors.bordercolor,
  },

  settingsSectionHeader: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
	margin: 10,
  },

});
