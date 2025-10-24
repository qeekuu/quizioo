import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./LoginScreen.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootNavigator";
import {useNavigation} from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
	const navigation = useNavigation<Nav>();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignIn = () => navigation.navigate("Home");

	const handleSignUp = () => navigation.navigate("Register");

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

