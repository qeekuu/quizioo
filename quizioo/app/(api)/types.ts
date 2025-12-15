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

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};

export type CreateQuizDTO = Omit<Quiz, "id">;
export type UpdateQuizDTO = Partial<CreateQuizDTO>;

export type CreateUserDTO = Omit<User, "id">;
export type RegisterDTO = CreateUserDTO;
export type UserPublic = Omit<User, "password">;
