import React, { useState } from "react";
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View, FlatList} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors, styles } from "./HomeScreen.styles";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/RootNavigator";
import {useNavigation} from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Quiz = {
  id: string;
  title: string;
  meta: string;
};

const recentQuiz = {
  title: "quiz name",
  progress: 0,
};

const liveQuizzes: Quiz[] = [
  { id: "1", title: "Statistics Math Quiz", meta: "Math · 12 Quizzes" },
  { id: "2", title: "Integers Quiz", meta: "Math · 10 Quizzes" },
  { id: "3", title: "Science Quiz", meta: "Physics · 8 Quizzes" },
];

export default function HomeScreen() {
	const navigation = useNavigation<Nav>();

	const handleSignIn = () => navigation.navigate("Login"); // tymczasowo do Login

	const renderQuiz = ({ item }: { item: Quiz }) => (
		<TouchableOpacity style={styles.quizCard}>
		<View style={styles.quizIcon}>
	       <Text style={styles.quizIconText}>📘</Text>
	     </View>
	     <View style={styles.quizTextContainer}>
	      <Text style={styles.quizTitle}>{item.title}</Text>
	      <Text style={styles.quizMeta}>{item.meta}</Text>
	     </View>
	    <Text style={styles.quizArrow}>›</Text>
	  </TouchableOpacity>
	);

	 return (
	   <SafeAreaProvider>
	    <SafeAreaView style={styles.container}>
	      <StatusBar barStyle="light-content" />

		    <View style={styles.content}>
		     {/* Pasek górny */}
		    <View style={styles.topBar}>
				<View>
				<Text style={styles.greetingLabel}>Hello</Text>
				<Text style={styles.greetingUserName}>UserName</Text>
				</View>

				<View style={styles.avatar}>
				<Text style={styles.avatarText}>USR</Text>
				</View>
			</View>

			<FlatList
				data={liveQuizzes}
				keyExtractor={(item) => item.id}
				renderItem={renderQuiz}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
				ListHeaderComponent={
				<>
					{/* Recent Quiz */}
					<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Text style={styles.sectionLabel}>Recent Quiz</Text>
						<Text style={styles.sectionTitle}>{recentQuiz.title}</Text>
					</View>
					<View style={styles.progressCircle}>
						<View style={styles.progressInnerCircle}>
						<Text style={styles.progressText}>
							{recentQuiz.progress}%
						</Text>
					</View>
                  </View>
                </View>

                {/* Nagłówek sekcji listy */}
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionHeaderTitle}>Live Quizzes</Text>
                  <TouchableOpacity>
                    <Text style={styles.sectionSeeAll}>See all</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

