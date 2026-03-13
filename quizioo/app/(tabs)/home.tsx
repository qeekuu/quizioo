import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabBar from "@/components/TabBar";
import ContentFrame from "@/components/ContentFrame";

const Home = () => {
	return (
		<SafeAreaView className="flex-1 bg-surface p-4">
			<View>
				<View>
					<TabBar username="Username"/>
				</View>
				<View className="flex-row justify-between items-center rounded-[25px] border-[6px] border-primary p-6 h-40 mt-4">
					<View>
						<Text className="tracking-wide font-bold" style={{ color: "#A3ADC2" }}>Recent Quiz</Text>
						<Text className="tracking-wide font-bold" style={{ color: "#FFF" }}>QuizName</Text>
					</View>
					<View className="justify-center items-center rounded-full border-[6px] border-primary w-20 h-20 p-2">
						<Text style={{ color: "#FFF" }}>100%</Text>
					</View>
				</View>
				<View className="mt-4 flex-row justify-between">
					<Text className="tracking-wide font-bold text-xl" style={{ color: "#FFF" }}>Live Quizzes</Text>
					<Text className="tracking-wide" style={{ color: "#17B9C4" }}>See All</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}
// TODO: Change 'See all' to <Link>, FlatList with quizzes
export default Home;
