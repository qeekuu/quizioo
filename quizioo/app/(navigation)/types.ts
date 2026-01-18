import type { User } from "@/app/(api)/types";

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	Home: undefined;
	App: undefined;
	Settings: undefined;
	QuizAdd: undefined;
	Questions: {
		quizName: string;
		quizType: string;
		correctPoints: number;
		incorrectPoints: number;
		numQuestions: number;
	};
	ProfilePicture: undefined;
};

export type TabParamList = {
	Home: {user: User};
	Quizzes: undefined;
	QuizAdd: undefined;
	Profile: undefined;
	Settings: undefined;
	QrCamera: undefined;
};


