import React, { lazy, use, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View, StatusBar, FlatList, SectionList, Switch } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./SettingsScreen.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import {useNavigation} from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export default function HomeScreen() {
	const navigation = useNavigation<Nav>();

	const [isDarkMode, setisDarkMode] = useState(true);
	const [isNot, setNot] = useState(false);
	const [isCamNot, setCamOn] = useState(false);

	const handleSignOut = () => {
		navigation.reset({
			index: 0,
			routes: [{name: "Login"}],
		})
	}

	const SETTINGS = [
		{
			title: "General Settings",
			data: [
				{ key: "Display", label: "Light or Dark"},
				{ key: "Notifications", label: "Yes or No" }
			],
		},
		{
			title: "Privacy and Security",
			data: [
				{ key: "Permissions", label: "Camera"},
			],
		},
		{
			title: "Account",
			data: [
				{ key: "Profile", label: "Chec Your Profile"},
				{ key: "Sign Out", label: "See you soon!"}
			],
		},
		{
			title: "Support",
			data: [
				{ key: "Contact", label: "Label"},
			],
		},

	];

  return (
	  <SafeAreaView style={styles.container}>
		<View style={styles.topBar}>
			<Text style={styles.topBarText}>Settings</Text>
		</View>

		<SectionList
        sections={SETTINGS}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.settingsSection}>
			<View>
				<Text style={styles.settingsSectionText}>{item.key}</Text>
			
				<Text style={styles.settingsSubSectionText}>{item.label}</Text>
			</View>
				{item.key == "Display" && (
					<Switch
						value={isDarkMode}
						onValueChange={(value) => setisDarkMode(value)}
					/>
				)}

				{item.key == "Notifications" && (
					<Switch
						value={isNot}
						onValueChange={(value) => setNot(value)}
					/>
				)}
				{item.key == "Permissions" && (
					<Switch
						value={isCamNot}
						onValueChange={(value) => setCamOn(value)}
					/>
				)}
				{item.key == "Profile" && (
					<Switch
						value={isCamNot}
						onValueChange={(value) => setCamOn(value)}
					/>
				)}
				{item.key == "Sign Out" && (
					<TouchableOpacity onPress={handleSignOut}>
						<Text style={styles.settingsSubSectionText}>Sign Out</Text>	
					</TouchableOpacity>
				)}
	
	
	
		  </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text style={styles.settingsSectionHeader}>{section.title}</Text>
          </View>
        )}
      />
		</SafeAreaView>
  );
}
