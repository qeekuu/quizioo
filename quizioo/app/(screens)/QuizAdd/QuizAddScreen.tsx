import React, { useState } from "react";
import { Alert, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./QuizAddScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/RootNavigator";
import { useNavigation } from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, "QuizAdd">;

type PointTypeItem = {
  label: "Regular" | "Custom";
  correctAnswer: string;
  incorrectAnswer: string;
};

export default function QuizAddScreen() {
  const navigation = useNavigation<Nav>();
  const handleSignIn = () => Alert.alert("New Quiz clicked");

  const pointTypes: PointTypeItem[] = [
    { label: "Regular", correctAnswer: "1", incorrectAnswer: "-1" },
    { label: "Custom", correctAnswer: "", incorrectAnswer: "" },
  ];

  const [pointType, setPointType] = useState<PointTypeItem["label"]>("Regular");
  const [correctPoints, setCorrectPoints] = useState("1");
  const [incorrectPoints, setIncorrectPoints] = useState("-1");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Create a new Quiz!</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          <View style={styles.createQuizSection}>
            <Text style={styles.createQuizSectionText}>Quiz name:</Text>
            <TextInput style={styles.createQuizSectionInput} />

            <Text style={styles.createQuizSectionText}>Type:</Text>
            <TextInput style={styles.createQuizSectionInput} />

            <Text style={styles.createQuizSectionText}>Points:</Text>
            <Dropdown
              data={pointTypes}
              labelField="label"
              valueField="label"
              placeholder="Select Type"
              value={pointType}
              onChange={(item: PointTypeItem) => {
                setPointType(item.label);
                setCorrectPoints(item.correctAnswer);
                setIncorrectPoints(item.incorrectAnswer);
              }}
              style={styles.dropdown}
			  placeholderStyle={styles.dropdownPlaceholder}
			  selectedTextStyle={styles.dropdownSelectedText}
			  containerStyle={styles.dropdownListContainer}
			  itemTextStyle={styles.dropdownItemText}
			  itemContainerStyle={styles.dropdownItemContainer}
			  activeColor={styles.dropdownActiveColor}
            />

            {pointType === "Custom" ? (
              <View style={styles.customPoints}>
                <Text style={styles.createQuizSectionText}>Points for correct answer:</Text>
                <TextInput
                  style={styles.createQuizSectionInput}
                  value={correctPoints}
                  onChangeText={setCorrectPoints}
                  keyboardType="numbers-and-punctuation"
                  placeholder="1"
				  placeholderTextColor={"#FFFFFF"}
                />

                <Text style={styles.createQuizSectionText}>Points for incorrect answer:</Text>
                <TextInput
                  style={styles.createQuizSectionInput}
                  value={incorrectPoints}
                  onChangeText={setIncorrectPoints}
                  keyboardType="numbers-and-punctuation"
                  placeholder="-1"
				  placeholderTextColor={"#FFFFFF"}
                />
              </View>
            ) : (
              <Text style={styles.text}>
                Correct: {correctPoints} | Incorrect: {incorrectPoints}
              </Text>
            )}

            <Text style={styles.createQuizSectionText}>Number of Questions:</Text>
            <TextInput keyboardType="number-pad" style={styles.createQuizSectionInput} />

			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Create Quiz</Text>
			</TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

