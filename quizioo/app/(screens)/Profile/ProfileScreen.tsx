import { Rect } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, colors } from "../Profile/ProfileScreen.styles";
import {Ionicons} from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useAuth } from "@/app/(context)/AppContext";

export default function ProfileScreen()
{
	const { state } = useAuth();

	const userName = state.user?.username ?? "Guest";

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.topBar}>
				<Text style={styles.topBarText}>{userName}</Text>
			</View>
			<View style={styles.profilePicture}>
				<Text style={styles.text}>profpic</Text>
			</View>
			<View style={styles.achievements}>
				<Text style={styles.achievementsText}>Achievements</Text>
				<Link screen="QuizAdd" params={{ id: 'quizadd' }}style={styles.textLink}>See all</Link>
			</View>
			<View style={styles.achievementsCard}>
				<Text style={styles.achievementsText}>Daily Streek</Text>
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
