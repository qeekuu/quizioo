import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import forgotPasswordScreen from "../screens/auth/forgotPasswordScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import QuizAddScreen from "../screens/QuizAdd/QuizAddScreen";

// typy tras
export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	Home: undefined;
	QuizAdd: undefined;
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
				options={{ title: "Home" }}
			/>
			<Stack.Screen
				name="QuizAdd"
				component={QuizAddScreen}
				options={{ title: "QuizAdd"}}
			/>
		</Stack.Navigator>
	</NavigationContainer>
	);
}

