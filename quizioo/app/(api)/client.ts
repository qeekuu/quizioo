import { API_BASE } from "./config";
import type { Question, Quiz, CreateQuizDTO, UpdateQuizDTO } from "./types";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
	async listQuizzes(): Promise<Quiz[]> {
		const res = await fetch(`${API_BASE}/quizzes?_sort=id&_order=desc`);
		return handle<Quiz[]>(res);
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
};

