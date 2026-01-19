import * as SecureStore from "expo-secure-store";

const REACENT_KEY = "reacent_quiz_v1";

export type RecentQuizInfo = {
	quizId: number;
	finishedAt: number;
	score: number;
	correntCounts: number;
	totalQuestions: number;
};

export async function saveRecentQuiz(info: RecentQuizInfo) {
	await SecureStore.setItemAsync(REACENT_KEY, JSON.stringify(info));
}

export async function loadRecentQuiz(): Promise<RecentQuizInfo | null> {
	const raw = await SecureStore.getItemAsync(REACENT_KEY);
	if(!raw)
		return null;
	try {
		return JSON.parse(raw) as RecentQuizInfo;
	} catch {
		return null;
	}
}

