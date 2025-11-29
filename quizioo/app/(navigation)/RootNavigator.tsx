import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../(screens)/auth/LoginScreen";
import RegisterScreen from "../(screens)/auth/RegisterScreen";
import ForgotPasswordScreen from "../(screens)/auth/ForgotPasswordScreen";
import HomeScreen from "../(screens)/home/HomeScreen";
import QuizAddScreen from "../(screens)/QuizAdd/QuizAddScreen";
import TabNav from "./TabNav";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(){

	const [isLoggedIn] = useState(true);

	return(
		<Stack.Navigator initialRouteName={isLoggedIn? "App" : "Login"}>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ title: "Sign In", headerShown: false }}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{ title: "Sign Up", headerShown: false }}
			/>
			<Stack.Screen
				name="ForgotPassword"
				component={ForgotPasswordScreen}
				options={{ title: "ForgotPassword"}}
			/>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
			/>
			<Stack.Screen
				name="App"
				component={TabNav}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
