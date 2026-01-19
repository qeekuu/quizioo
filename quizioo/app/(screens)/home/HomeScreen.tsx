import React, { useState, useCallback } from "react";
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View, FlatList} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./HomeScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import { useNavigation, Link, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useEffect } from "react";
import { api } from "@/app/(api)/client";
import type { Quiz } from "@/app/(api)/types";
import { TabParamList } from "@/app/(navigation)/types";
import { useAuth } from "@/app/(context)/AppContext";
import { Avatar } from "../components/Avatar";
import { useFocusEffect } from "@react-navigation/native";
import { loadRecentQuiz } from "@/app/(utils)/recentQuiz";

import {blue} from "react-native-reanimated/lib/typescript/Colors";

import type { RouteProp } from "@react-navigation/native";
import type { ComponentProps } from "react";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeRoute = RouteProp<TabParamList, "Home">;


export default function HomeScreen() {
	const { state } = useAuth();
	const navigation = useNavigation<Nav>();
	const route = useRoute<HomeRoute>();
	
	const userName = state.user?.username ?? "Guest";

	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState(true);
	const [recent, setRecent] = useState<{ quiz: Quiz; percent: number } | null>(null);

	type IoniconName = ComponentProps<typeof Ionicons>["name"];
	const hour = new Date().getHours();

	let greetingIcon : IoniconName;
	if (hour >= 6 && hour < 12)
		greetingIcon = "sunny-outline";
	else if (hour >= 12 && hour < 18)
		greetingIcon = "sunny";
	else if (hour >= 18 && hour < 22)
		greetingIcon = "partly-sunny";
	else
		greetingIcon = "moon";

	{/*
	useEffect(() => {
    let mounted = true;
    const loadQuizzes = async () => {
      try {
        const data = await api.listQuizzesHome();
        if (mounted) setQuizzes(data);
      } catch (e) {
        Alert.alert("Error", "Cannot load quizzes");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadQuizzes();
    return () => {
      mounted = false;
    };
  }, []);
  */}

	const loadQuizzes = async () => {
		try {
			setLoading(true);
			const data = await api.listQuizzesHome();
			setQuizzes(data);
		} catch (e) {
			Alert.alert("Error", "Cannot load quizzes");
		} finally {
			setLoading(false);
		}
	};

	const loadRecent = async () => {
		try {
			const info = await loadRecentQuiz();
			if(!info){
				setRecent(null);
				return;
			}

			const q = await api.getQuiz(info.quizId);

			const percent = info.totalQuestions > 0 ? Math.round((info.correntCounts / info.totalQuestions) * 100) : 0;

			setRecent({ quiz: q, percent });
		} catch {
			setRecent(null);
		}
	};

	useFocusEffect(
		useCallback(() => {
			let cancelled = false;

			(async () => {
				try {	
					setLoading(true);
					const [homeList] = await Promise.all([
						api.listQuizzesHome(),
						loadRecent(),
					]);
					
					if(cancelled)
						return;
					setQuizzes(homeList);
				} catch (e) {
					Alert.alert("Error", "Cannot load quizzes");
				} finally {
					if(!cancelled)
						setLoading(false);
				}
		})();

			return () => {
				cancelled = false;
			};
		}, [])
	);
 

	type ItemProps = {quiz: Quiz};

	const Item = ({ quiz }: ItemProps) => (
	<TouchableOpacity 
		style={styles.containerItem}
		onPress={() => navigation.navigate("QuizDetails", { id: quiz.id })}
	>
		<View style={styles.leftIcon}>
		<Ionicons name="book-sharp" size={32} color="rgba(100, 200, 255, 0.8)" />
		</View>

		<View style={styles.centerText}>
		<Text style={styles.title}>{quiz.quizName}</Text>
		<Text style={styles.subTitle}>{quiz.quizType}</Text>
		</View>

		<View style={styles.rightArrow}>
		<Text style={styles.quizArrow}>{'>'}</Text>
		</View>
	</TouchableOpacity>
	);

	 return (
		 <SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<View style={styles.greetingIconStyle}>
					<Ionicons
						name={greetingIcon}
						size={18}
						color="rgba(255,255,255,0.9)"
					/>
					<Text style={styles.topBarText}>Hi, {userName}</Text>
				</View>
				<View style={styles.topBarImageBox}>
					<Avatar 
						avatarUri={state.user?.avatarUri}
						size={50}
					/>

				</View>
			</View> 
			<View style={styles.cardReacentQuiz}>
				<View>
					<Text style={styles.textMuted}>Reacent Quiz</Text>
					<Text style={styles.textReacentQuiz}>{recent ? recent.quiz.quizName : "No recent quiz yet"}</Text>
				</View>
				<View style={styles.cardQuizPercent}>
					<Text style={styles.text}>{recent ? `${recent.percent}%` : "-"}</Text>
				</View>

			</View>
			<View style={styles.liveQuiz}>
				<Text style={styles.liveQuizText}>Live Quizzes</Text>
				<Link screen="Quizzes" params={{ id: 'quizzes' }}style={styles.textLink}>See all</Link>
			</View>

			<FlatList
				data={quizzes}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <Item quiz={item} />}
				ListEmptyComponent={
					!loading ? (
						<Text style={{ textAlign: "center", color: "#aaa", marginTop: 20 }}>
							No quizzes available
						</Text>
					) : null
				}
			/>
			
		 </SafeAreaView>
  );
}
