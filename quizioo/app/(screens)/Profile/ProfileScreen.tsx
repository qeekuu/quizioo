import { Rect } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, colors } from "../Profile/ProfileScreen.styles";
import {Ionicons} from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useAuth } from "@/app/(context)/AppContext";
import WeeklyStreak from "../components/WeeklyStreak";
import {Avatar} from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "ProfilePicture">;

export default function ProfileScreen()
{
	const navigation = useNavigation<Nav>();
	const { state } = useAuth();

	const userName = state.user?.username ?? "Guest";

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
						size={96}
					/>
				{ /*				<Link screen="ProfilePicture" params={{id: 'profpic'}} style={styles.textLink}>Click to change</Link> */}
				</TouchableOpacity>
			</View>
			<View style={styles.achievements}>
				<Text style={styles.achievementsText}>Achievements</Text>
				<Link screen="QuizAdd" params={{ id: 'quizadd' }}style={styles.textLink}>See all</Link>
			</View>
			<View style={styles.achievementsCard}>
				<Text style={styles.dailyStreekText}>Daily Streek</Text>
				<View style={styles.staticticsCard}>
					<WeeklyStreak
						week={[true, true, true, false, true, true, true]}
						currentStreak={5}
						bestStreak={18}
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
