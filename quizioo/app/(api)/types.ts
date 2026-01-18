export type QuestionType = "single" | "multiple" | "open" | "boolean" | "image" | "math";

export type Question = 
	| {
		type: "single";
		question: string;
		answers: string[];
		correctIndex: number;
	  }
	| {
		type: "multiple";
		question: string;
		answers: string[];
		correctIndexes: number[];
	  }
	| {
		type: "open";
		question: string;
		correctText: string;
	  }
	| {
		type: "boolean";
		question: string;
		correctBool: boolean;
	  }
	| {
		type: "image";
		question: string;
		imageUri: string;
	  }
	| {
		type: "math";
		question: string;
		math: string;
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

export type PageResponse<T> = {
  data: T[];
  first: number;
  items: number;      
  last: number; 
  next: number | null;
  pages: number;
  prev: number | null;
};

export type Category = {
  id: number;
  label: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  avatarUri?: string;
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
export type UpdateUserDTO = Partial<Pick<User, "avatarUri" | "username">>;

