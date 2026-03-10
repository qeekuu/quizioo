import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";

const _Layout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#0E1422",
					borderTopWidth: 1,
					borderTopColor: "#141B2C",
					height: 100,
					paddingBottom: 8,
					paddingTop: 8,
					elevation: 0,
					shadowOpacity: 0,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				}
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ size, focused }) => <TabIcon name={focused ? "home" : "home-outline"} color={focused ? "#FD86D4" : "#fff"} size={focused ? 28 : 22} />
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ size, focused }) => <TabIcon name={focused ? "person" : "person-outline"} color={focused ? "#FD86D4" : "#fff"} size={focused ? 28: 22} />
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					headerShown: false,
					tabBarIcon: ({ size, focused }) => <TabIcon name={focused ? "settings" : "settings-outline"} color={focused ? "#FD86D4" : "#fff"} size={focused ? 28 : 22} />
				}}
			/>
		</Tabs>
	)
}

export default _Layout
