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
	async listQuizzes(params: {
		page?: number;
		perPage?: number;
		q?: string;
		quizType?: string | null;
		signal?: AbortSignal;
	}): Promise<{ data: Quiz[]; total: number, next: number | null, last: number }> {
		const { page = 1, perPage = 3, q = "", quizType = null, signal, } = params;

		const qs = new URLSearchParams();
		qs.set("_sort", "id");
		qs.set("_order", "desc");
		qs.set("_page", String(page));
		qs.set("_per_page", String(perPage));

		const trimmedQ = q.trim();
		if (trimmedQ.length > 0) qs.set("q", trimmedQ);

		// filtr po polu quizType
		if (quizType) qs.set("quizType", quizType);

		const res = await fetch(`${API_BASE}/quizzes?${qs.toString()}`, { signal });
console.log("X-Total-Count:", res.headers.get("X-Total-Count"));

		if (!res.ok) {
			const body = await res.text().catch(() => "");
			throw new Error(`HTTP ${res.status}: ${body || res.statusText}`);
		}

		const json = (await res.json()) as PageResponse<Quiz>;
		return { data: json.data, total: json.items, next: json.next, last: json.last };
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
	
};

