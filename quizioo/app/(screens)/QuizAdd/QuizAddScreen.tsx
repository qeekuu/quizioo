import React, { useState, useEffect } from "react";
import { Alert, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { styles } from "./QuizAddScreen.styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/(navigation)/types";
import { useNavigation } from "@react-navigation/native";
import { api } from "@/app/(api)/client";

import type { Category } from "@/app/(api)/types";

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

  const [quizName, setQuizName] = useState("");
  const [quizType, setQuizType] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [catLoading, setCatLoading] = useState(true);

  const [pointType, setPointType] = useState<PointTypeItem["label"] | null>(null);
  const [correctPoints, setCorrectPoints] = useState("");
  const [incorrectPoints, setIncorrectPoints] = useState("");

  const [numQuestions, setNumQuestions] = useState("");

  useEffect(() => {
	let mounted = true;

	(async () => {
		try {
			setCatLoading(true);
			const list = await api.listCategories();
			if(mounted)
				setCategories(list);
		} catch(e: any){
			Alert.alert("Error", e?.message ?? "Cannot load categoriees");
		} finally {
			if(mounted)
				setCatLoading(false);
		}
	})();

	return () => {
		mounted = false;
	};
  }, []);

  const handleQuizAdd = async (): Promise<void> => {
	const nq = parseInt(numQuestions, 10);

	if (!quizName.trim()) 
		return Alert.alert("Validation", "Enter quiz name");
    if (!quizType) 
		return Alert.alert("Validation", "Select quiz type");
    if (!pointType) 
		return Alert.alert("Validation", "Select points type");
    if (!Number.isFinite(nq) || nq <= 0) 
		return Alert.alert("Validation", "Enter correct number of questions (> 0)");

	const cp = Number(correctPoints);
	const ip = Number(incorrectPoints);

	if(!Number.isFinite(cp) || !Number.isFinite(ip))
		return Alert.alert("Validation", "Points must be numbers");

	try {
		const existing = await api.listQuizzesExisting();
		const targetName = quizName.trim();
		const targetType = quizType; // kategorie

		const taken = existing.some(q => q.quizName.trim() === targetName && q.quizType === targetType);
		if(taken)
			return Alert.alert("Validation", "Quiz name already exist in this category, choose diffrent one.");

	navigation.navigate("Questions", {
	  mode: 'create',
      quizName: targetName,
      quizType: targetType,
      correctPoints: cp,
      incorrectPoints: ip,
      numQuestions: nq,
    });
	} catch(e: any) {
		Alert.alert("Error", e?.message ?? "Cannot chceck quiz name");
	}
	
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

            <Text style={styles.createQuizSectionText}>Category:</Text>
			<Dropdown
			   data={categories}
			   labelField="label"
			   valueField="label"
			   placeholder={catLoading ? "Loading..." : "Select category"}
			   disable={catLoading || categories.length === 0}
			   value={quizType}
			   onChange={(item: Category) => setQuizType(item.label)}

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

