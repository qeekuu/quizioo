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
  bordercolor: "#fd86b4"
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
	flex: 1,
	paddingHorizontal: 20,
	paddingTop: 16,
  },

	/* TOP BAR */
	topBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
	},

	greetingLabel: {
		fontSize: 12,
		letterSpacing: 1,
		color: colors.textMuted,
		textTransform: "uppercase",
	},

	greetingUserName: {
		marginTop: 4,
		fontSize: 22,
		fontWeight: "700",
		color: colors.text,
	},

	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: colors.surface,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: colors.bordercolor,
	},

	avatarText: {
		color: colors.text,
		fontWeight: "700",
	},

	scrollContent: {
		paddingBottom: 120,
	},
	
	/* REACENT QUIZ */
	header: {
		backgroundColor: colors.surface,
		borderColor: colors.bordercolor,
		borderWidth: 2,
		borderRadius: 24,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 16,
		shadowOffset: { width: 0, height: 8 },
		elevation: 8,
		marginBottom: 20,
	},

	headerLeft: {
		flex: 1,
	},

	sectionLabel: {
		fontSize: 12,
		color: colors.textMuted,
		marginBottom: 4,
	},

	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.text,
	},

	progressCircle: {
		width: 64,
		height: 64,
		borderRadius: 32,
		borderWidth: 4,
		borderColor: colors.bordercolor,
		alignItems: "center",
		justifyContent: "center",
	},

	progressInnerCircle: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: colors.surface,
		alignItems: "center",
		justifyContent: "center",
	},

	progressText: {
		color: colors.text,
		fontWeight: "700",
	},

	/* LIVE QUIZZES */

	sectionHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},

	sectionHeaderTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: colors.text,
	},

	sectionSeeAll: {
		fontSize: 13,
		color: colors.primary,
	},

	quizCard: {
		backgroundColor: colors.surface,
		borderRadius: 18,
		padding: 14,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
		borderWidth: 2,
		borderColor: colors.bordercolor,
	},

	quizIcon: {
		width: 40,
		height: 40,
		borderRadius: 12,
		backgroundColor: colors.inputBg,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},

	quizIconText: {
		fontSize: 20,
	},

	quizTextContainer: {
		flex: 1,
	},

	quizTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: colors.text,
		marginBottom: 2,
	},

	quizMeta: {
		fontSize: 12,
		color: colors.textMuted,
	},

	quizArrow: {
		fontSize: 22,
		color: colors.textMuted,
		marginLeft: 8,
	},
	

});

