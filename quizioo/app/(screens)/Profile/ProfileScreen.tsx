import { Rect } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, colors } from "../Profile/ProfileScreen.styles";
import {Ionicons} from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

export default function ProfileScreen()
{
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<Text style={styles.topBarText}>Profile</Text>
			</View>
			<View style={styles.profilePicture}>
				<Text style={styles.text}>profpic</Text>
			</View>
			<View style={styles.staticticsCard}>
				<TouchableOpacity style={styles.button}>
					<View style={styles.buttonIcon}>
						<Ionicons name="settings" size={32} color="rgba(100, 200, 255, 0.8)" />
					</View>
					<Text style={styles.buttonText}>Your settings</Text>	
				</TouchableOpacity>
			</View>
            {/* Zmienić Link */}
			<View style={styles.achievements}>
				<Text style={styles.achievementsText}>Achievements</Text>
				<Link screen="QuizAdd" params={{ id: 'quizadd' }}style={styles.textLink}>See all</Link>
			</View>
			<View style={styles.achievementsCard}>

			</View>
		</SafeAreaView>
	);
}
