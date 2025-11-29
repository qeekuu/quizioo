import React, { useState } from "react";
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View, FlatList} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./HomeScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import { useNavigation, Link } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {blue} from "react-native-reanimated/lib/typescript/Colors";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;


export default function HomeScreen() {
	const navigation = useNavigation<Nav>();

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

	type ItemProps = {title: string, subTitle: string};

	const Item = ({title, subTitle}: ItemProps) => (
		<TouchableOpacity style={styles.containerItem}>
			<View style={styles.leftIcon}>
				<Ionicons name="book-sharp" size={32} color="rgba(100, 200, 255, 0.8)" />	
			</View>

			<View style={styles.centerText}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.subTitle}>{subTitle}</Text>
			</View>
			<View style={styles.rightArrow}>
				<Text style={styles.quizArrow}>{'>'}</Text>
			</View>
		</TouchableOpacity>
	);

	 return (
		 <SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<Text style={styles.topBarText}>UserName</Text>
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
				data={DATA}
				renderItem={({item}) => <Item title={item.title} subTitle={item.subTitle} />}
				keyExtractor={item => item.id}
			/>
		 </SafeAreaView>
  );
}
