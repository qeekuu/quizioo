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
};

export type TabParamList = {
	Home: undefined;
	Quizzes: undefined;
	QuizAdd: undefined;
	Profile: undefined;
	Settings: undefined;
};


