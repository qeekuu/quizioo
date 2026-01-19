import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, colors } from "../Profile/ProfileScreen.styles";
import {Ionicons} from "@expo/vector-icons";
import { useAuth } from "@/app/(context)/AppContext";
import WeeklyStreak from "../components/WeeklyStreak";
import {Avatar} from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import { loadStreak, buildWeekArrayFromVisited } from "@/app/(utils)/streak";
import { useFocusEffect } from "@react-navigation/native";
import { StreakState } from "@/app/(utils)/streak";

type Nav = NativeStackNavigationProp<RootStackParamList, "ProfilePicture">;

export default function ProfileScreen()
{
	const navigation = useNavigation<Nav>();
	const { state } = useAuth();

	const userName = state.user?.username ?? "Guest";

	const [streak, setStreak] = useState<StreakState>({ visitedDays: [], currentStreak: 0, bestStreak: 0 });
	{/* 
	useEffect(() => {
		if(!state.user?.id)
			return;
		loadStreak(state.user.id).then(setStreak);
	}, [state.user?.id]);
	*/}
   useFocusEffect(
	   useCallback(() => {
			let alive = true;
			const userId = state.user?.id;
			if(!userId)
				return;

			loadStreak(userId).then((s) => {
				if(alive)
					setStreak(s);
			});

			return () => {
				alive = false;
			};
	   }, [state.user?.id])
   );
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<Text style={styles.topBarText}>Profile: {userName}</Text>
			</View>
			<View style={styles.profilePicture}>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => navigation.navigate("ProfilePicture")}

				>
					<Avatar 
						avatarUri={state.user?.avatarUri}
						size={138}
					/>
				{ /*				<Link screen="ProfilePicture" params={{id: 'profpic'}} style={styles.textLink}>Click to change</Link> */}
				</TouchableOpacity>
			</View>
			<View style={styles.achievements}>
				<Text style={styles.achievementsText}>Achievements</Text>
			</View>
			<View style={styles.achievementsCard}>
				<Text style={styles.dailyStreekText}>Daily Streek</Text>
				<View style={styles.staticticsCard}>
					<WeeklyStreak
						week={buildWeekArrayFromVisited(streak.visitedDays)}
						currentStreak={streak.currentStreak}
						bestStreak={streak.bestStreak}
					/>
				</View>
			</View>
            {/* Zmienić Link */}
			<View style={styles.staticticsCard}>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonIcon}>
						<Ionicons name="diamond-sharp" size={32} color="rgba(100, 200, 255, 0.8)" />
					</View>
					<Text style={styles.buttonText}>Get Premium</Text>	
				</TouchableOpacity>
			</View>
    
		</SafeAreaView>
	);
}
