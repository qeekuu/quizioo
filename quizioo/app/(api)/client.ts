import { API_BASE } from "./config";
import type { Question, Quiz, CreateQuizDTO, UpdateQuizDTO, User, RegisterDTO, LoginDTO, Category, UpdateUserDTO, PageResponse } from "./types";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
	async listQuizzesHome(): Promise<Quiz[]> {
		const res = await fetch(`${API_BASE}/quizzes?_sort=id&_order=desc&_limit=3`);
		return handle<Quiz[]>(res);
	},

	async listQuizzesExisting(): Promise<Quiz[]> {
		const res = await fetch(`${API_BASE}/quizzes?_sort=id&_order=desc`);
		return handle<Quiz[]>(res);
	},

	async listCategories(): Promise<Category[]> {
		const res = await fetch(`${API_BASE}/categories?_sort=id&_order=desc`);
		return handle<Category[]>(res);
	},

	async createQuiz(data: CreateQuizDTO) : Promise<Quiz> {
		const res = await fetch(`${API_BASE}/quizzes`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		return handle<Quiz>(res);
	},

	async updateQuiz(id: number, data: UpdateQuizDTO) : Promise<Quiz> {
		const res = await fetch(`${API_BASE}/quizzes/${id}`, {
			method: "PATCH",
			headers: { "Content-Type" : "application/json" },
			body: JSON.stringify(data),
		});
		return handle<Quiz>(res);
	},

	async deleteQuiz(id: number) : Promise<void> {
		const res = await fetch(`${API_BASE}/quizzes/${id}`, {
			method: "DELETE",
		});
		await handle<unknown>(res);
	},
	
	async getQuiz(id: number) : Promise<Quiz> {
		const res = await fetch(`${API_BASE}/quizzes/${id}`);
		return handle<Quiz>(res);
	},

  async findUserByEmail(email: string): Promise<User | null> {
    const res = await fetch(`${API_BASE}/users?email=${encodeURIComponent(email)}`);
    const list = await handle<User[]>(res);
    return list[0] ?? null;
  },

  async register(data: RegisterDTO): Promise<User> {
    // blokada duplikatów
    const exists = await this.findUserByEmail(data.email);
    if (exists) throw new Error("Email already exists");

    // json-server zapis
    const user: User = {
      id: (globalThis.crypto as any)?.randomUUID?.() ?? Math.random().toString(16).slice(2),
	  username: data.username,
      email: data.email,
      password: data.password,
      createdAt: data.createdAt,
    };

    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return handle<User>(res);
  },

  async login(data: LoginDTO): Promise<User> {
    // json-server query filter
    const res = await fetch(
      `${API_BASE}/users?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(
        data.password
      )}`
    );
    const list = await handle<User[]>(res);

    const user = list[0];
    if (!user) throw new Error("Invalid email or password");
    return user;
  },

  async updateUser(id:string, data: UpdateUserDTO): Promise<User> {
	const res = await fetch(`${API_BASE}/users/${encodeURIComponent(id)}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify(data),
	});
	return handle<User>(res);
  },

  async createQuizShare(quizId: number): Promise<{ code: string }> {
	const code = (globalThis.crypto as any)?.randomUUID?.() ?? Math.random().toString(16).slice(2);

	const res = await fetch(`${API_BASE}/quizShares`, {
		method: "POST",
		headers: { "Content-Type": "application/json"},
		body: JSON.stringify({
			code,
			quizId,
			createdAt: new Date().toISOString(),
		}),
	});

	await handle(res);
	return { code };
  },

  async importQuizByShareCode(code: string): Promise<Quiz> {
	const resShare = await fetch(`${API_BASE}/quizShares?code=${encodeURIComponent(code)}`);
	const shares = await handle<any[]>(resShare);

	const share = shares[0];
	if(!share)
		throw new Error("Invalid code (share not found)");

	const quiz = await this.getQuiz(Number(share.quizId));

	const copy: Omit<Quiz, "id"> = {
		quizName: `${quiz.quizName} (imported)`,
		quizType: quiz.quizType,
		correctPoints: quiz.correctPoints,
		incorrectPoints: quiz.incorrectPoints,
		questions: quiz.questions,
		createdAt: new Date().toISOString(),
	};

	const created = await this.createQuiz(copy as any);
	return created;
  },
};

