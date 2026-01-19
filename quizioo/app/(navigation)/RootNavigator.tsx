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
import QuestionsScreen from "../(screens)/QuizAdd/QuestionsScreen";
import {useAuth} from "../(context)/AppContext";
import ProfileScreen from "../(screens)/Profile/ProfileScreen";
import ProfilePicture from "../(screens)/Profile/ProfilePicture";
import QuizDetails from "../(screens)/Quizzes/QuizDetails";
import QrShareScreen from "../(screens)/Quizzes/QrShareScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(){

	const { state } = useAuth();

	if(!state.isReady) return null;

	return(
		<Stack.Navigator initialRouteName={state.user ? "App" : "Login"}>
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
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Questions"
				component={QuestionsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ProfilePicture"
				component={ProfilePicture}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="QuizDetails"
				component={QuizDetails}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="QrShare"
				component={QrShareScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="App"
				component={TabNav}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
