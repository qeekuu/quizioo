import { Rect } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../Quizzes/QuizzesScreen.style";
import { Dropdown } from "react-native-element-dropdown";

export default function QuizzesScreen()
{
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Quizzes</Text>
            </View>
            <View style={styles.searchCard}>
                <Text style={styles.searchCardText}>Filters:</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Select category..."
                    placeholderTextColor={"#FFFFFF"}
                >

                </TextInput>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for quizzes..."
                    placeholderTextColor={"#FFFFFF"}
                >

                </TextInput>
            </View>

        </SafeAreaView>
    );
}
