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
	margin: 10,
	marginTop: 8,
	color: colors.text,
  },

  textMuted: {
	color: colors.textMuted,
  },

  topBar: {
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'row',
	height:  70,
	margin: 10,
	marginBottom: 25,
	paddingLeft: 15,
	paddingRight: 15,
	borderRadius: 15,
	borderBottomWidth: 7,
	borderBottomColor: colors.bordercolor,
  },

  topBarText: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
  },

  createQuizSection: {
	justifyContent: 'flex-start',
	alignItems: 'stretch',
	flexDirection: 'column',
	paddingLeft: 25,
	paddingRight: 25,
	margin: 10,
	borderRadius: 25,
	borderWidth: 5,
	borderColor: colors.bordercolor,
  },

  createQuizSectionText: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
	marginTop: 10,
	marginBottom: 8,
  },

  createQuizSectionInput: {
	width: "100%",
	padding: 10,
	marginTop: 12,
	marginBottom: 12,
	borderRadius: 25,
	color: colors.text,
	backgroundColor: colors.surface,
  },

  dropdown: {
	width: "100%",
	height: 45,
	padding: 10,
	borderRadius: 25,
    backgroundColor: colors.surface,
  },

  dropdownPlaceholder: {
	color: colors.textMuted,
  },

  dropdownSelectedText: {
	color: colors.text,
	fontSize: 14,
  },

  dropdownListContainer: {
	backgroundColor: colors.surface,
	borderRadius: 16,
	paddingVertical: 6,
	borderWidth: 1,
	borderColor: colors.bordercolor,
  },

  dropdownItemContainer: {
	borderRadius: 12,
	marginHorizontal: 6,
  },

  dropdownItemText: {
	color: colors.text,
	fontSize: 14,
  },

  dropdownActiveColor: {

  },

  customPoints: {
	width: "100%",
	alignSelf: 'stretch',
	marginTop: 8,
  },

  button: {
	height: 52,
	marginBottom: 12,
	justifyContent: 'center',
	alignItems: 'center',
	width: "100%",
    backgroundColor: colors.bordercolor,
    borderRadius: 16,
  },

  buttonText: { 
	  color: colors.onPrimary, 
	  fontSize: 16, 
	  fontWeight: "700" 
  },

  quizInfText: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
	margin: 10,
  },

  paramText: {
	color: colors.textMuted,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 12,
	padding: 3,
  }

});
