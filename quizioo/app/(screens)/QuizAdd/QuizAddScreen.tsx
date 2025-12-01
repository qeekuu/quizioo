import React, { useState } from "react";
import { Alert, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./QuizAddScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import { useNavigation } from "@react-navigation/native";

type Nav = NativeStackNavigationProp<RootStackParamList, "QuizAdd">;

type PointTypeItem = {
  label: "Regular" | "Custom";
  correctAnswer: string;
  incorrectAnswer: string;
};

export default function QuizAddScreen() {
  const navigation = useNavigation<Nav>();

  const pointTypes: PointTypeItem[] = [
    { label: "Regular", correctAnswer: "1", incorrectAnswer: "-1" },
    { label: "Custom", correctAnswer: "", incorrectAnswer: "" },
  ];

  const quizTypeTypes = [
	{ label: "Math" },
	{ label: 'Physics' },
	{ label: 'Language' },
  ];

  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState<string | null>(null);

  const [pointType, setPointType] = useState<PointTypeItem["label"] | null>(null);
  const [correctPoints, setCorrectPoints] = useState("");
  const [incorrectPoints, setIncorrectPoints] = useState("");

  const [numQuestions, setNumQuestions] = useState("");

  const handleQuizAdd = () => {
	const nq = parseInt(numQuestions, 10);

	if (!quizName.trim()) return Alert.alert("Validation", "Enter quiz name");
    if (!quizType) return Alert.alert("Validation", "Select quiz type");
    if (!pointType) return Alert.alert("Validation", "Select points type");
    if (!Number.isFinite(nq) || nq <= 0) return Alert.alert("Validation", "Enter correct number of questions (> 0)");

	const cp = Number(correctPoints);
    const ip = Number(incorrectPoints);
    if (!Number.isFinite(cp) || !Number.isFinite(ip)) return Alert.alert("Validation", "Points must be numbers");

	navigation.navigate("Questions", {
      quizName: quizName.trim(),
      quizType,
      correctPoints: cp,
      incorrectPoints: ip,
      numQuestions: nq,
    });
	
  };

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
            <TextInput
				style={styles.createQuizSectionInput} 
				value={quizName}
				onChangeText={setQuizName}
			/>

            <Text style={styles.createQuizSectionText}>Type:</Text>
			<Dropdown
			   data={quizTypeTypes}
			   labelField="label"
			   valueField="label"
			   placeholder="Select Type"
			   value={quizType}
			   onChange={(item: { label: string }) => setQuizType(item.label)}

              style={styles.dropdown}
			  placeholderStyle={styles.dropdownPlaceholder}
			  selectedTextStyle={styles.dropdownSelectedText}
			  containerStyle={styles.dropdownListContainer}
			  itemTextStyle={styles.dropdownItemText}
			  itemContainerStyle={styles.dropdownItemContainer}
			  activeColor={styles.dropdownActiveColor}

			/>
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
            ) : pointType ? (
              <Text style={styles.text}>
                Correct: {correctPoints} | Incorrect: {incorrectPoints}
              </Text>
            ): null}

            <Text style={styles.createQuizSectionText}>Number of Questions:</Text>
            <TextInput 
				keyboardType="number-pad" 
				style={styles.createQuizSectionInput}
				value={numQuestions}
				onChangeText={setNumQuestions}
			/>

			<TouchableOpacity style={styles.button} onPress={handleQuizAdd}>
				<Text style={styles.buttonText}>Create Quiz</Text>
			</TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

