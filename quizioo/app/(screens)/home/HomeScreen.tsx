import React, { useState } from "react";
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

import {blue} from "react-native-reanimated/lib/typescript/Colors";

import type { RouteProp } from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type HomeRoute = RouteProp<TabParamList, "Home">;


export default function HomeScreen() {
	const { state } = useAuth();
	const navigation = useNavigation<Nav>();
	const route = useRoute<HomeRoute>();
	
	const userName = state.user?.username ?? "Guest";

	const [quizzes, setQuizzes] = useState<Quiz[]>([]);
	const [loading, setLoading] = useState(true);

	const handleSignIn = () => navigation.navigate("Login"); // tymczasowo do Login

	const DATA = [
		{	
			id: '1', title: 'Statistics Math Quiz', subTitle: 'Math • 12 Quizzes'
		},
		{	
			id: '2', title: 'Integes Quiz', subTitle: 'Math • 10 Quizzes'
		},
		{	
			id: '3', title: 'Science Quiz', subTitle: 'Physics • Quizzes'
		},
	];

	useEffect(() => {
    let mounted = true;

    const loadQuizzes = async () => {
      try {
        const data = await api.listQuizzes();
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


	type ItemProps = {quiz: Quiz};

	const Item = ({ quiz }: ItemProps) => (
	<TouchableOpacity style={styles.containerItem}>
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
				<Text style={styles.topBarText}>{userName}</Text>
				<View style={styles.topBarImageBox}>
					<Image style={styles.topBarImage} source={""} contentFit="contain"/>
				</View>
			</View> 
			<View style={styles.cardReacentQuiz}>
				<View>
					<Text style={styles.textMuted}>Reacent Quiz</Text>
					<Text style={styles.textReacentQuiz}>Name</Text>
				</View>
				<View style={styles.cardQuizPercent}>
					<Text style={styles.text}>100%</Text>
				</View>

			</View>
			<View style={styles.liveQuiz}>
				<Text style={styles.liveQuizText}>Live Quizzes</Text>
				<Link screen="QuizAdd" params={{ id: 'quizadd' }}style={styles.textLink}>See all</Link>
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
