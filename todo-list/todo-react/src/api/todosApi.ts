import type { TodoItem } from '../types/todo';

const STORAGE_KEY = 'todos';

function delay(ms: number = 150): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function readTodosFromStorage(): TodoItem[] {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as TodoItem[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

function writeTodosToStorage(todos: TodoItem[]): void {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export async function apiFetchTodos(): Promise<TodoItem[]> {
	await delay();
	return readTodosFromStorage();
}

export async function apiAddTodo(title: string): Promise<TodoItem> {
	await delay();
	const trimmed = title.trim();
	if (!trimmed) {
		throw new Error('Title cannot be empty');
	}
	const todos = readTodosFromStorage();
	const newTodo: TodoItem = {
		id: crypto.randomUUID(),
		title: trimmed,
		completed: false,
		createdAt: Date.now(),
	};
	writeTodosToStorage([newTodo, ...todos]);
	return newTodo;
}

export async function apiToggleTodo(id: string): Promise<TodoItem> {
	await delay();
	const todos = readTodosFromStorage();
	const idx = todos.findIndex((t) => t.id === id);
	if (idx === -1) throw new Error('Todo not found');
	const updated: TodoItem = { ...todos[idx], completed: !todos[idx].completed };
	const next = [...todos];
	next[idx] = updated;
	writeTodosToStorage(next);
	return updated;
}

export async function apiDeleteTodo(id: string): Promise<string> {
	await delay();
	const todos = readTodosFromStorage();
	const next = todos.filter((t) => t.id !== id);
	writeTodosToStorage(next);
	return id;
}


