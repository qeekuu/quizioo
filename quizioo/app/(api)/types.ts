export type Question = {
	question: string;
	answers: [string, string, string, string];
	correctIndex: number;
};

export type Quiz = {
	id: number;
	quizName: string;
	quizType: string;
	correctPoints: number;
	incorrectPoints: number;
	questions: Question[];
	createdAt: string;
};

export type CreateQuizDTO = Omit<Quiz, "id">;
export type UpdateQuizDTO = Partial<CreateQuizDTO>;
