import { View, Text } from "react-native";
import React from "react";
import Avatar from "./Avatar";

interface TabBarProps {
	username: string;
}

const TabBar = ({ username }: TabBarProps) => {
	return (
		<View className="border-b-8 border-primary rounded-xl px-2">
			<View className="flex-row justify-between items-center">
				<View>
					<Text className="tracking-widest font-semibold text-lg" style={{ color: "#FFF" }}>{username}</Text>	
				</View>
				<View>
					<Avatar size={48}/>
				</View>
			</View>

		</View>
	)
}

export default TabBar
