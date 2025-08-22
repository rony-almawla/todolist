import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TodoFilter, TodoItem } from '../../types/todo';
import { apiAddTodo, apiDeleteTodo, apiFetchTodos, apiToggleTodo } from '../../api/todosApi';

interface TodosState {
	items: TodoItem[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
	filter: TodoFilter;
}

const initialState: TodosState = {
	items: [],
	status: 'idle',
	error: null,
	filter: 'all',
};

export const fetchTodos = createAsyncThunk('todos/fetchAll', async () => {
	const todos = await apiFetchTodos();
	return todos;
});

export const createTodo = createAsyncThunk('todos/create', async (title: string) => {
	const todo = await apiAddTodo(title);
	return todo;
});

export const toggleTodo = createAsyncThunk('todos/toggle', async (id: string) => {
	const updated = await apiToggleTodo(id);
	return updated;
});

export const deleteTodo = createAsyncThunk('todos/delete', async (id: string) => {
	await apiDeleteTodo(id);
	return id;
});

const todosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		setFilter(state, action: PayloadAction<TodoFilter>) {
			state.filter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? 'Failed to fetch todos';
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				state.items.unshift(action.payload);
			})
			.addCase(toggleTodo.fulfilled, (state, action) => {
				const idx = state.items.findIndex((t) => t.id === action.payload.id);
				if (idx !== -1) state.items[idx] = action.payload;
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.items = state.items.filter((t) => t.id !== action.payload);
			});
	},
});

export const { setFilter } = todosSlice.actions;
export default todosSlice.reducer;

export function selectFilteredTodos(items: TodoItem[], filter: TodoFilter): TodoItem[] {
	if (filter === 'active') return items.filter((t) => !t.completed);
	if (filter === 'completed') return items.filter((t) => t.completed);
	return items;
}


