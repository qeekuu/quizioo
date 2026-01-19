import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { styles } from "./QuizzesScreen.style";
import type { RootStackParamList } from "@/app/(navigation)/types";
import { api } from "@/app/(api)/client";
import type { Quiz, Question } from "@/app/(api)/types";

import { saveRecentQuiz } from "@/app/(utils)/recentQuiz";

type Nav = NativeStackNavigationProp<RootStackParamList, "QuizDetails">;
type QuizDetailsRoute = RouteProp<RootStackParamList, "QuizDetails">;

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function arraysEqualAsSets(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sa = new Set(a);
  for (const x of b) if (!sa.has(x)) return false;
  return true;
}

export default function QuizDetails() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<QuizDetailsRoute>();
  const quizId = route.params.id;

  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [idx, setIdx] = useState(0);

  const [singleIndex, setSingleIndex] = useState<number | null>(null);
  const [multiIndexes, setMultiIndexes] = useState<number[]>([]);
  const [openText, setOpenText] = useState("");
  const [boolValue, setBoolValue] = useState<boolean | null>(null);

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const q = await api.getQuiz(quizId);
        if (!mounted) return;
        setQuiz(q);
      } catch (e: any) {
        if (!mounted) return;
        Alert.alert("Error", e?.message ?? "Cannot load quiz");
        navigation.goBack();
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [quizId, navigation]);

  const questions = quiz?.questions ?? [];
  const current = questions[idx];

  const topBarTitle = useMemo(() => (quiz ? quiz.quizName : "Quiz details"), [quiz]);

  function resetAnswerBuffers() {
    setSingleIndex(null);
    setMultiIndexes([]);
    setOpenText("");
    setBoolValue(null);
  }

  function resetSolve() {
    setStarted(false);
    setFinished(false);
    setIdx(0);
    resetAnswerBuffers();
    setScore(0);
    setCorrectCount(0);
  }

  function toggleMulti(i: number) {
    setMultiIndexes((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  }

  function isCorrect(q: Question): boolean {
    if (q.type === "single") {
      return singleIndex !== null && singleIndex === q.correctIndex;
    }
    if (q.type === "multiple") {
      return arraysEqualAsSets(multiIndexes, q.correctIndexes);
    }
    if (q.type === "open") {
      return normalize(openText) === normalize(q.correctText);
    }
    if (q.type === "boolean") {
      return boolValue !== null && boolValue === q.correctBool;
    }

    return false;
  }

  function onSubmitAnswer() {
    if (!quiz || !current) return;

    const correct = isCorrect(current);

    const last = idx >= questions.length - 1;
    if (last) {
		const deltaScore = correct ? quiz.correctPoints : quiz.incorrectPoints;
		const finalScore = score + deltaScore;
		const finalCorrect = correct ? (correctCount + 1) : correctCount;
		
		saveRecentQuiz({
			quizId: quiz.id,
			finishedAt: Date.now(),
			score: finalScore,
			correntCounts: finalCorrect,
			totalQuestions: questions.length,
		}).catch(() => {});

		setScore(finalScore);
		setCorrectCount(finalCorrect);
		setFinished(true);
		setStarted(false);
    } else {
		if(correct) {
			setScore((s) => s + quiz.correctPoints);
			setCorrectCount((c) => c + 1);
		} else {
			setScore((s) => s + quiz.incorrectPoints);
		}

		setIdx((i) => i + 1);
		resetAnswerBuffers();
    }
  }

  function onEditQuestions() {
    if (!quiz) return;
    navigation.navigate("Questions", {
	  mode: 'edit',
      quizId: quiz.id,
      quizName: quiz.quizName,
      quizType: quiz.quizType,
      correctPoints: quiz.correctPoints,
      incorrectPoints: quiz.incorrectPoints,
      numQuestions: quiz.questions?.length ?? 0,
    });
  }

  async function onDeleteQuiz() {
    Alert.alert("Delete quiz", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.deleteQuiz(quizId);
            Alert.alert("OK", "Quiz deleted");
            navigation.goBack();
          } catch (e: any) {
            Alert.alert("Error", e?.message ?? "Cannot delete quiz");
          }
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>{topBarTitle}</Text>
      </View>

      {loading ? (
        <View style={{ padding: 16 }}>
          <ActivityIndicator />
        </View>
      ) : !quiz ? (
        <View style={{ padding: 16 }}>
          <Text style={styles.textMuted}>Quiz not found</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
          <View style={{ gap: 6 }}>
            <Text style={[styles.text, { fontSize: 18 }]}>Category: {quiz.quizType}</Text>
            <Text style={[styles.text, { fontSize: 18 }]}>Questions: {questions.length}</Text>
            <Text style={[styles.text, { fontSize: 18 }]}>
              Points: +{quiz.correctPoints} / {quiz.incorrectPoints}
            </Text>
          </View>

          <View style={{ flexDirection: "column", gap: 10 }}>
            <TouchableOpacity style={styles.button} onPress={onEditQuestions}>
              <Text style={styles.text}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onDeleteQuiz}>
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("QrShare", { quizId: quiz.id })}>
				<Text style={styles.text}>Share QR</Text>
			</TouchableOpacity>
			
          </View>

          {!started && !finished ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (questions.length === 0) {
                  Alert.alert("Info", "This quiz has no questions yet.");
                  return;
                }
                resetSolve();
                setStarted(true);
              }}
            >
              <Text style={styles.text}>Start quiz</Text>
            </TouchableOpacity>
          ) : null}

          {started && current ? (
            <View style={{ gap: 12 }}>
              <Text style={styles.textMuted}>
                Question {idx + 1} / {questions.length} • {current.type}
              </Text>

              <Text style={styles.title}>{current.question}</Text>

              {current.type === "single" && (
                <View style={{ gap: 10 }}>
                  {current.answers.map((a, i) => {
                    const selected = singleIndex === i;
                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.containerItem,
                          selected && { borderWidth: 1, borderColor: "#17B9C4" },
                        ]}
                        onPress={() => setSingleIndex(i)}
                      >
                        <View style={styles.centerText}>
                          <Text style={styles.text}>{a}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {current.type === "multiple" && (
                <View style={{ gap: 10 }}>
                  {current.answers.map((a, i) => {
                    const selected = multiIndexes.includes(i);
                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.containerItem,
                          selected && { borderWidth: 1, borderColor: "#17B9C4" },
                        ]}
                        onPress={() => toggleMulti(i)}
                      >
                        <View style={styles.centerText}>
                          <Text style={styles.text}>
                            {selected ? "✅ " : "⬜ "} {a}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              {current.type === "open" && (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Type your answer..."
                  placeholderTextColor={"#FFFFFF"}
                  value={openText}
                  onChangeText={setOpenText}
                />
              )}

              {current.type === "boolean" && (
                <View style={{ flexDirection: "column", gap: 10 }}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      boolValue === true && { borderWidth: 1, borderColor: "#17B9C4" },
                    ]}
                    onPress={() => setBoolValue(true)}
                  >
                    <Text style={styles.text}>True</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      boolValue === false && { borderWidth: 1, borderColor: "#17B9C4" },
                    ]}
                    onPress={() => setBoolValue(false)}
                  >
                    <Text style={styles.text}>False</Text>
                  </TouchableOpacity>
                </View>
              )}

              {(current.type === "image" || current.type === "math") && (
                <Text style={styles.textMuted}>
                  This question type has no “correct answer” field in your model, so it isn’t scored.
                </Text>
              )}

              <TouchableOpacity style={styles.button} onPress={onSubmitAnswer}>
                <Text style={styles.text}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {finished ? (
            <View style={{ gap: 10 }}>
              <Text style={styles.title}>Result</Text>
              <Text style={styles.textMuted}>
                Correct: {correctCount} / {questions.length}
              </Text>
              <Text style={styles.textMuted}>Score: {score}</Text>

              <TouchableOpacity style={styles.button} onPress={resetSolve}>
                <Text style={styles.text}>Try again</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

