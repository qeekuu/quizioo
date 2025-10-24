import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./RegisterScreen.styles";

export default function RegisterScreen() {
  const [count, setCount] = useState(0);

  const handleSignIn = () => Alert.alert("Sign In clicked");
  const handleSignUp = () => Alert.alert("Sign Up clicked");

  return (
    <SafeAreaView style={styles.container}>
		<View style={styles.frame}>
			<View style={styles.content}>
				<Text style={styles.title}>Sign In</Text>

				<TextInput
					style={styles.input}
					placeholder="e-mail"
					keyboardType="email-address" 
					placeholderTextColor={colors.textPlaceholder}
					selectionColor={colors.primary}
					cursorColor={colors.primary}
					/>
				<TextInput style={styles.input}
					placeholder="password"
					secureTextEntry
					placeholderTextColor={colors.textPlaceholder}
					selectionColor={colors.primary}
					cursorColor={colors.primary}
					/>

				<View style={styles.buttons}>
					<TouchableOpacity style={styles.button} onPress={handleSignIn}>
						<Text style={styles.buttonText}>Sign In</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignUp}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
    </SafeAreaView>
  );
}

