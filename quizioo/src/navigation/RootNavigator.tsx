import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import forgotPasswordScreen from "../screens/auth/forgotPasswordScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import QuizAddScreen from "../screens/QuizAdd/QuizAddScreen";
import tabNav from "./tabNav";

// typy tras
export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	Home: undefined;
	App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(){
	return(
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Login">
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
				component={forgotPasswordScreen}
				options={{ title: "ForgotPassword"}}
			/>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
			/>
			<Stack.Screen
				name="App"
				component={tabNav}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
	);
}

