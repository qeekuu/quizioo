import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./QuizAddScreen.styles";
import { RootStackParamList } from "@/app/(navigation)/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Questions">;

type QuestionItem = {
  question: string;
  answers: [string, string, string, string];
  correctIndex: number; // 0..3
};

export default function QuestionsScreen({ route }: Props) {
  const { quizName, quizType, correctPoints, incorrectPoints, numQuestions } = route.params;

  // tablica obiektów pytań (pytanie + 4 odpowiedzi + poprawna)
  const [questions, setQuestions] = useState<QuestionItem[]>(
    () =>
      Array.from({ length: numQuestions }, () => ({
        question: "",
        answers: ["", "", "", ""] as [string, string, string, string],
        correctIndex: 0,
      }))
  );

  const pointsLabel = useMemo(
    () => `Correct: ${correctPoints} | Incorrect: ${incorrectPoints}`,
    [correctPoints, incorrectPoints]
  );

  const updateQuestionText = useCallback((qIndex: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex], question: text };
      return copy;
    });
  }, []);

  const updateAnswerText = useCallback((qIndex: number, aIndex: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      const q = copy[qIndex];

      const newAnswers = [...q.answers] as QuestionItem["answers"];
      newAnswers[aIndex] = text;

      copy[qIndex] = { ...q, answers: newAnswers };
      return copy;
    });
  }, []);

  const setCorrectAnswer = useCallback((qIndex: number, aIndex: number) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex] = { ...copy[qIndex], correctIndex: aIndex };
      return copy;
    });
  }, []);

  const renderQuestion = useCallback(
    ({ item, index }: { item: QuestionItem; index: number }) => (
      <View style={styles.createQuizSection}>
        <Text style={styles.createQuizSectionText}>Question {index + 1}:</Text>

        <TextInput
          style={styles.createQuizSectionInput}
          value={item.question}
          onChangeText={(text) => updateQuestionText(index, text)}
          placeholder={`Type question ${index + 1}...`}
          placeholderTextColor={"#FFFFFF"}
        />

        <Text style={styles.createQuizSectionText}>Answers:</Text>

        {item.answers.map((ans, aIndex) => {
          const letter = String.fromCharCode(65 + aIndex); // A B C D
          const isCorrect = item.correctIndex === aIndex;

          return (
            <View key={aIndex} style={{ marginBottom: 12 }}>
              <TextInput
                style={styles.createQuizSectionInput}
                value={ans}
                onChangeText={(text) => updateAnswerText(index, aIndex, text)}
                placeholder={`Answer ${letter}...`}
                placeholderTextColor={"#FFFFFF"}
              />

              <TouchableOpacity
                style={[
                  styles.button,
                  { height: 44, marginBottom: 0, opacity: isCorrect ? 1 : 0.85 },
                ]}
                onPress={() => setCorrectAnswer(index, aIndex)}
              >
                <Text style={styles.buttonText}>
                  {isCorrect ? `✓ Answer ${letter} is correct` : `Set Answer ${letter} as correct`}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    ),
    [updateQuestionText, updateAnswerText, setCorrectAnswer]
  );

  const ListHeaderComponent = (
    <>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Add Questions</Text>
      </View>

      <Text style={styles.quizInfText}>Quiz Information</Text>

      <View style={styles.createQuizSection}>
        <Text style={styles.paramText}>Quiz name: {quizName}</Text>
        <Text style={styles.paramText}>Type: {quizType}</Text>
        <Text style={styles.paramText}>Points: {pointsLabel}</Text>
      </View>
    </>
  );

  const ListFooterComponent = (
    <View style={{ paddingHorizontal: 25, paddingBottom: 16 }}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // [{ question, answers: [A,B,C,D], correctIndex }, ...]
          console.log(questions);
        }}
      >
        <Text style={styles.buttonText}>Save Questions</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={questions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderQuestion}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

