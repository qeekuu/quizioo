import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StatusBar, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./SettingsScreen.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/RootNavigator";
import {useNavigation} from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export default function HomeScreen() {
	const navigation = useNavigation<Nav>();

	const handleSignOut = (name: string) => {
		navigation.reset({
			index: 0,
			routes: [{name: "Login"}],
		})
	}

  return (
	<SafeAreaProvider>
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle={"light-content"} />
				<View style={styles.content}>
					<View style={styles.topBar}>
						<View>
							<Text style={styles.settingLabel}>Settings</Text>
							<TouchableOpacity
								onPress={() => handleSignOut("Sign out")}
							>
								<Text>Tekst</Text>
							</TouchableOpacity>
						</View>	
					</View>	
				</View>

		</SafeAreaView>
	</SafeAreaProvider>
  );
}
