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
		padding: 10,
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

	profilePicture: {
		height: 150,
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		paddingLeft: 15,
		paddingRight: 15,
		margin: 10,
		borderRadius: 75,
		borderWidth: 5,
		borderColor: colors.bordercolor,
	},

	staticticsCard: {
		margin: 10,
	},

	button: {
		height: 75,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 12,
		borderRadius: 25,
		borderWidth: 5,
		borderColor: colors.bordercolor,
	},

	buttonText: {
		color: colors.text,
		fontWeight: 'bold',
		fontSize: 17,
	},

	buttonIcon: {
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 15,
	},

	achievements:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10,
	},

	achievementsText: {
		color: colors.text,
		letterSpacing: 0.7,
		fontWeight: 'bold',
		fontSize: 17,
    },

	dailyStreekText: {
		color: colors.text,
		letterSpacing: 0.7,
		fontWeight: 'bold',
		fontSize: 17,
		marginBottom: 15,
    },

	achievementsCard: {
		height: 225,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		padding: 12,
		margin: 10,
		borderRadius: 16,
		borderWidth: 5,
		borderColor: colors.bordercolor,
	},
	
	avatarCard: {
		alignItems: 'center',
		padding: 12,
		margin: 10,
		borderRadius: 16,
		borderWidth: 5,
		borderColor: colors.bordercolor,
	},

	avatarCardInside: {
		flexDirection: "row",
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},

	avatarTile: {
		width: 80,
		height: 80,
		margin: 10,
		borderRadius: 16,
		backgroundColor: colors.surface,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.stroke,
	},
	avatarLabel: {
		marginTop: 4,
		color: colors.text,
		fontSize: 12,
	},
});
