import React, { useState, useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./QuizAddScreen.styles";
import { RootStackParamList } from "@/app/(navigation)/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { api } from "@/app/(api)/client";
import { API_BASE } from "@/app/(api)/config";

import type { Question, QuestionType } from "@/app/(api)/types";

type Props = NativeStackScreenProps<RootStackParamList, "Questions">;

const QUESTION_TYPES: { label: string; value: QuestionType }[] = [
	{ label: "Single choice", value: "single" },
	{ label: "Multiple choice", value: "multiple" },
	{ label: "Open", value: "open" },
	{ label: "True/False", value: "boolean" },
	{ label: "Image", value: "image" },
	{ label: "Math", value: "math" },
];

export default function QuestionsScreen({ route }: Props) {
console.log("API_BASE =", API_BASE);
	
  const { quizName, quizType, correctPoints, incorrectPoints, numQuestions } = route.params;

  {/*
  // tablica pytań
  const [questions, setQuestions] = useState<QuestionItem[]>(
    () =>
      Array.from({ length: numQuestions }, () => ({
		type: "single",
        question: "",
        answers: ["", ""],
        correctIndex: 0,
      }))
  );
  */}

  const [questions, setQuestions] = useState<Question[]>(
	() =>
	  Array.from({ length:numQuestions }, () => ({
		type: "single",
		question: "",
		answers: ["", ""],
		correctIndex: 0,
	  }))
  )

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

		if(q.type !== "single" && q.type !== "multiple")
			return prev;

      const newAnswers = [...q.answers];
      newAnswers[aIndex] = text;

      copy[qIndex] = { ...q, answers: newAnswers };
      return copy;
    });
  }, []);

  const setCorrectAnswer = useCallback((qIndex: number, aIndex: number) => {
    setQuestions((prev) => {
      const copy = [...prev];
	  const q = copy[qIndex];

	  if(q.type !== "single")
		  return prev;

	  if(aIndex < 0 || aIndex >= q.answers.length)
		  return prev;

      copy[qIndex] = { ...q, correctIndex: aIndex };
      return copy;
    });
  }, []);

  const addAnswer = useCallback((qIndex: number) => {
	setQuestions((prev) => {
		const copy = [...prev];
		const q = copy[qIndex];
		
		if(q.type !== "single" && q.type !== "multiple")
			return prev;

		copy[qIndex] = { ...q, answers: [...q.answers, ""] };
		return copy;
	});
  }, []);

  const removeAnswer = useCallback((qIndex: number, aIndex: number) => {
	setQuestions((prev) => {
		const copy = [...prev];
		const q = copy[qIndex];

		if(q.type !== "single" && q.type !== "multiple")
			return prev;
		if(q.answers.length <= 2)
			return prev; // minimalnie dwie odpowiedzi

		const newAnswers = q.answers.filter((_, i) => i !== aIndex);

		if(q.type === "single") {
			let newCorrect = q.correctIndex;
			if(aIndex === q.correctIndex) 
				newCorrect = 0;
			else if (aIndex < q.correctIndex)
				newCorrect = q.correctIndex - 1;

			copy[qIndex] = { ...q, answers: newAnswers, correctIndex: newCorrect };
			return copy;
		}

		const newCorrectIndexes = q.correctIndexes.filter((i) => i !== aIndex).map((i) => (i > aIndex ? i - 1 : i));

		copy[qIndex] = { ...q, answers: newAnswers, correctIndexes: newCorrectIndexes };
		return copy;
	});
  }, []);

  const toggleMultiple = useCallback((qIndex: number, aIndex: number) => {
    setQuestions(prev => {
      const copy = [...prev];
      const q = copy[qIndex];
      if (q.type !== "multiple") 
		  return prev;

      const set = new Set(q.correctIndexes);
      set.has(aIndex) ? set.delete(aIndex) : set.add(aIndex);

      copy[qIndex] = {
        ...q,
        correctIndexes: Array.from(set).sort(),
      };
      return copy;
    });
  }, []);

  const setBoolean = useCallback((qIndex: number, value: boolean) => {
    setQuestions(prev => {
      const copy = [...prev];
      const q = copy[qIndex];
      if (q.type !== "boolean") 
		  return prev;

      copy[qIndex] = { ...q, correctBool: value };
      return copy;
    });
  }, []);

  const setImage = useCallback((qIndex: number, uri: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      const q = copy[qIndex];
      if (q.type !== "image") 
		  return prev;

      copy[qIndex] = { ...q, imageUri: uri };
      return copy;
    });
  }, []);

  const setMath = useCallback((qIndex: number, math: string) => {
    setQuestions(prev => {
      const copy = [...prev];
      const q = copy[qIndex];
      if (q.type !== "math") 
		  return prev;

      copy[qIndex] = { ...q, math };
      return copy;
    });
  }, []);


  // funkcja zmiany typu pytania
  const changeType = useCallback((qIndex: number, type: QuestionType) => {
    setQuestions(prev => {
      const copy = [...prev];
      const old = copy[qIndex];
      const questionText = old.question;

      switch (type) {
        case "single":
          copy[qIndex] = { type, question: questionText, answers: ["", ""], correctIndex: 0 };
          break;
        case "multiple":
          copy[qIndex] = { type, question: questionText, answers: ["", ""], correctIndexes: [] };
          break;
        case "open":
          copy[qIndex] = { type, question: questionText, correctText: "" };
          break;
        case "boolean":
          copy[qIndex] = { type, question: questionText, correctBool: true };
          break;
        case "image":
          copy[qIndex] = { type, question: questionText, imageUri: "" };
          break;
        case "math":
          copy[qIndex] = { type, question: questionText, math: "" };
          break;
      }
      return copy;
    });
  }, []);

  const renderQuestion = ({ item, index }: { item: Question; index: number }) => (
    <View style={styles.createQuizSection}>

      {/* 1. Numer pytania */}
      <Text style={styles.createQuizSectionText}>
        Question {index + 1}
      </Text>

      {/* 2. Wybór typu pytania */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {QUESTION_TYPES.map(t => (
          <TouchableOpacity
            key={t.value}
            style={[
              styles.button,
              { height: 36, opacity: item.type === t.value ? 1 : 0.6 }
            ]}
            onPress={() => changeType(index, t.value)}
          >
            <Text style={styles.buttonText}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Treść pytania */}
      <TextInput
        style={styles.createQuizSectionInput}
        value={item.question}
        onChangeText={text => updateQuestionText(index, text)}
        placeholder="Question..."
      />

      {/* 4. SINGLE / MULTIPLE */}
      {(item.type === "single" || item.type === "multiple") && (
        <>
          <Text style={styles.createQuizSectionText}>Answers</Text>

          {item.answers.map((ans, aIndex) => {
            const isCorrect =
              item.type === "single" ? item.correctIndex === aIndex : item.correctIndexes.includes(aIndex);

            return (
              <View key={aIndex}>
                <TextInput
                  style={styles.createQuizSectionInput}
                  value={ans}
                  onChangeText={text =>
                    updateAnswerText(index, aIndex, text)
                  }
                  placeholder={`Answer ${aIndex + 1}`}
                />

                {/* single */}
                {item.type === "single" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setCorrectAnswer(index, aIndex)}
                  >
                    <Text style={styles.buttonText}>
                      {isCorrect ? "✓ Correct" : "Mark correct"}
                    </Text>
                  </TouchableOpacity>
                )}

                {/* multiple */}
                {item.type === "multiple" && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => toggleMultiple(index, aIndex)}
                  >
                    <Text style={styles.buttonText}>
                      {isCorrect ? "✓ Correct" : "Mark correct"}
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => removeAnswer(index, aIndex)}
                >
                  <Text style={styles.buttonText}>Remove answer</Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.button}
            onPress={() => addAnswer(index)}
          >
            <Text style={styles.buttonText}>Add answer</Text>
          </TouchableOpacity>
        </>
      )}

      {/* 5. OPEN */}
      {item.type === "open" && (
        <TextInput
          style={styles.createQuizSectionInput}
          value={item.correctText}
          onChangeText={text =>
            setQuestions(p => {
              const c = [...p];
              c[index] = { ...item, correctText: text };
              return c;
            })
          }
          placeholder="Correct answer"
        />
      )}

      {/* 6. BOOLEAN */}
      {item.type === "boolean" && (
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBoolean(index, true)}
          >
            <Text style={styles.buttonText}>True</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBoolean(index, false)}
          >
            <Text style={styles.buttonText}>False</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 7. IMAGE */}
      {item.type === "image" && (
        <TextInput
          style={styles.createQuizSectionInput}
          value={item.imageUri}
          onChangeText={text =>
            setImage(index, text)
          }
          placeholder="Image URI"
        />
      )}

      {/* 8. MATH */}
      {item.type === "math" && (
        <TextInput
          style={styles.createQuizSectionInput}
          value={item.math}
          onChangeText={text =>
            setMath(index, text)
          }
          placeholder="LaTeX / math"
        />
      )}

    </View>
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
        onPress={async () => {
			// żeby nie zapisywać pustych
			const hasEmpty = questions.some(q => {
			  if (!q.question.trim()) return true;

			  if (q.type === "single")
				return q.answers.length < 2 || q.answers.some(a => !a.trim());

			  if (q.type === "multiple")
				return q.answers.length < 2 || q.answers.some(a => !a.trim()) || q.correctIndexes.length === 0;

			  if (q.type === "open")
				return !q.correctText.trim();
	
			  if (q.type === "boolean")
				return typeof q.correctBool !== "boolean";

			  if (q.type === "image")
				return !q.imageUri.trim();

			  if (q.type === "math")
				return !q.math.trim();

			return true;
			});

			if(hasEmpty)
				return Alert.alert("Validation", "Fill all the questions and answers.");
			
			try {
				await api.createQuiz({
					quizName : quizName.trim(),
					quizType,
					correctPoints,
					incorrectPoints,
					questions,
					createdAt: new Date().toISOString(),
				});

				Alert.alert("Saved", "Quiz saved to db.json");
			} catch(e: any){
				Alert.alert("Error", e?.message ?? "Quiz has not been saved");
			}
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

