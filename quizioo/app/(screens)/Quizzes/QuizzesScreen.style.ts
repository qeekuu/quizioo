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

    searchInput: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
        borderRadius: 25,
        borderWidth: 5,
        borderColor: colors.bordercolor
    }

});