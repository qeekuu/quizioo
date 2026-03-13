import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "@/components/TabBar";

const Profile = () => {
	return (
		<SafeAreaView className="flex-1 bg-surface p-4">
			<View>
				<TabBar username="Username"/>
			</View>
		</SafeAreaView>
	)
}

export default Profile
