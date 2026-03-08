import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";

const _Layout = () => {
	return (
		<Tabs
	
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ size, focused }) => <TabIcon name="home" color={focused ? "#FD86D4" : "#000"} size={32} />
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ size, focused }) => <TabIcon name="person" color={focused ? "#FD86D4" : "#000"} size={32} />
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: 'Settings',
					headerShown: false,
					tabBarIcon: ({ size, focused }) => <TabIcon name="settings" color={focused ? "#FD86D4" : "#000"} size={32} />
				}}
			/>
		</Tabs>
	)
}

export default _Layout
