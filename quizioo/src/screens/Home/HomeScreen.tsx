import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./HomeScreen.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootNavigator";
import {useNavigation} from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
	const navigation = useNavigation<Nav>();

	const handleSignIn = () => navigation.navigate("Login"); // tymczasowo do Login

  return (
    <SafeAreaView style={styles.container}>
		<View style={styles.header}>

		</View>




    </SafeAreaView>
  );
}

