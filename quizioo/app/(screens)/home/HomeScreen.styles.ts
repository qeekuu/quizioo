import { StyleSheet } from "react-native";

export const colors = {
  background: "#0E1422",
  surface: "#141B2C",
  link: "#17B9C4",
  onPrimary: "#FFFFFF",
  text: "#F8FAFC",
  textMuted: "#A3ADC2",
  textPlaceholder: "#6B7280",
  stroke: "#2B3248",
  inputBg: "#111826",
  bordercolor: "#fd86b4"
};


export const styles = StyleSheet.create({
  container: { 
	flex: 1, 
	backgroundColor: colors.background,
  },
	
  text: {
	color: colors.text,
  },

  textMuted: {
	color: colors.textMuted,
  },

  textLink: {
	color: colors.link,
  },

  topBar: {
	backgroundColor: colors.background,
	height: 70,
	borderRadius: 10,
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'row',
	color: colors.background,
	paddingLeft: 15,
	paddingRight: 8,
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

  topBarImageBox: {
	width: 50,
	height: 50,
	borderRadius: 9,
	backgroundColor: colors.bordercolor,
	justifyContent: 'center',
	alignItems: 'center',
  },

  topBarImage: {
	width: 40,
	height: 40,
	borderRadius: 7,
  },

  cardReacentQuiz: {
	height: 125,
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'row',
	paddingLeft: 25,
	paddingRight: 25,
	margin: 10,
	marginBottom: 25,
	borderRadius: 25,
	backgroundColor: colors.background,
	borderWidth: 5,
	borderColor: colors.bordercolor,
  },

  textReacentQuiz: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
  },

  cardQuizPercent: {
	width: 75,
	height: 75,
	borderRadius: 40,
	borderWidth: 5,
	borderColor: colors.bordercolor,
	backgroundColor: colors.background,
	justifyContent: 'center',
	alignItems: 'center',
  },

  liveQuiz: {
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'row',
	margin: 10,
  },

  liveQuizText: {
	color: colors.text,
	letterSpacing: 0.7,
	fontWeight: 'bold',
	fontSize: 17,
  },

  containerItem: {
	alignItems: 'center',
	flexDirection: 'row',
	height: 75,
	margin: 10,
	borderRadius: 25,
	backgroundColor: colors.background,
	borderWidth: 5,
	borderColor: colors.bordercolor,
	paddingHorizontal: 20,	
  },

  leftIcon: {
	  width: 40,
	  alignItems: 'center',
	  justifyContent: 'center',
	  marginRight: 15,
  },

  centerText: {
	flex: 1,
  },

  rightArrow: {
	width: 30,
	alignItems: 'flex-end',
	justifyContent: 'center',
  },

  quizArrow: {
	color: colors.textMuted,
	fontSize: 17,
	fontWeight: 'bold',
  },

  title: {
	color: colors.text,
  },

  subTitle: {
	color: colors.textMuted,
  },

});
