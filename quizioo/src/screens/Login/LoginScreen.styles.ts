import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#778899",
  },
  frame: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	padding: 20,
  },
  content: {
	width: "100%",
    maxWidth: 420,      
    padding: 24,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.35)", 
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.15)",   
    // cień (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    // cień (Android)
    elevation: 6,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    marginBottom: 30,
	textAlign: "center",
  },
  input: {
    backgroundColor: "#708090",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  buttons: {
    alignSelf: "stretch",
    gap: 16, 
  },
  button: {
    backgroundColor: "#2F4F4F",
    borderBlockColor: "#ccc",
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },
  signUpButton: {
    backgroundColor: "#2F4F4F",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

