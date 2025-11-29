import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./QuizAddScreen.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/RootNavigator";
import {useNavigation} from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'QuizAdd'>;

export default function HomeScreen() {
	const navigation = useNavigation<Nav>();

	const handleSignIn = () => Alert.alert("New Quiz clicked");

  return (
	<SafeAreaProvider>
    <SafeAreaView style={styles.container}>
		<View style={styles.frame}>
			<View style={styles.content}>
				<Text style={styles.title}>QuizAddScreen</Text>

				<View style={styles.buttons}>
					<TouchableOpacity style={styles.button} onPress={handleSignIn}>
						<Text style={styles.buttonText}>New Quiz</Text>
					</TouchableOpacity>

				</View>
			</View>
		</View>
    </SafeAreaView>
	</SafeAreaProvider>
  );
}
