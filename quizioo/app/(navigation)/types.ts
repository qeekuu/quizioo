import type { User } from "@/app/(api)/types";

export type RootStackParamList = {
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	Home: undefined;
	App: undefined;
	Settings: undefined;
	QuizAdd: undefined;
	Questions:
    | {
        mode: "create";
        quizName: string;
        quizType: string;
        correctPoints: number;
        incorrectPoints: number;
        numQuestions: number;
      }
    | {
        mode: "edit";
        quizId: number;
        quizName: string;
        quizType: string;
        correctPoints: number;
        incorrectPoints: number;
        numQuestions: number;
      };
	ProfilePicture: undefined;
	QuizDetails: { id: number };
	QrShare : { quizId: number};
};

export type TabParamList = {
	Home: {user: User};
	Quizzes: undefined;
	QuizAdd: undefined;
	Profile: undefined;
	Settings: undefined;
	QrCamera: undefined;
	QuizDetails: undefined;
	ProfilePicture: undefined;
};


