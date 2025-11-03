import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import QuizAddScreen from "../screens/QuizAdd/QuizAddScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import {Ionicons} from "@expo/vector-icons";

export type TabParamList = {
	Home: undefined;
	QuizAdd: undefined;
	Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNav(){
	return (
		<Tab.Navigator screenOptions={{ 
			tabBarActiveTintColor: "#17B9C4", 
			tabBarInactiveTintColor: "#fff",  
			headerShown: false,
			tabBarStyle:{
				backgroundColor: "#0E1422",
				borderTopWidth: 1,
				borderBlockColor: "#141B2C",
				height: 100,
				paddingBottom: 30,
				paddingTop: 10,
			},
			tabBarLabelStyle: {
				fontSize: 10,
				fontWeight: "bold",
			}
		}}>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					title: "Home",
					tabBarIcon: ({ color, size }) => <Ionicons name ="home" color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="QuizAdd"
				component={QuizAddScreen}
				options={{
					title: "QuizAdd",
					tabBarIcon: ({ color, size }) => <Ionicons name ="add" color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => <Ionicons name ="settings" color={color} size={size} />
				}}
			/>
		</Tab.Navigator>
	);

}
