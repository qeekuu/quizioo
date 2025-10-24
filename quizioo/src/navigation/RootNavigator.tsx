import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Login/LoginScreen";
import RegisterScreen from "../screens/Register/RegisterScreen";

// typy tras
export type RootStackParamList = {
	Login: undefined;
	Register: { referallCode?: string } | undefined;
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
				options={{ title: "Sign Up" }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
	);
}

