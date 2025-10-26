import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import QuizAddScreen from "../screens/QuizAdd/QuizAddScreen";
import {Ionicons} from "@expo/vector-icons";

export type TabParamList = {
	Home: undefined;
	QuizAdd: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function tabNav(){
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
			/>
			<Tab.Screen
				name="QuizAdd"
				component={QuizAddScreen}
			/>
		</Tab.Navigator>
	);

}
