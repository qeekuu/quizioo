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

    searchCard: {

    },

    searchCardText: {
        color: colors.text,
        letterSpacing: 0.7,
        fontWeight: 'bold',
        fontSize: 17,
        margin: 10,
    },

    searchInput: {
        width: "100%",
        padding: 10,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 25,
        color: colors.text,
        backgroundColor: colors.surface,
    },

    button: {
        height: 32,
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
        color:colors.text,
    },

    subTitle: {
        color: colors.textMuted,
    },

    paginationRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 'auto',
        paddingTop: 8,
        paddingBottom: 8,
    },

    pagBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#2a2f36",
    },

    pagBtnDisabled: {
        opacity: 0.4,
    },

    pagBtnText: {
        color: colors.text,
        fontWeight: "600",
    },

    pagBtnTextDisabled: {
        color: "#666b75",
    },

    pageInfo: {
        color: colors.text,
        fontSize: 14,
        opacity: 0.8,
    },
}