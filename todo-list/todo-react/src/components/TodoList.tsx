import { useEffect } from 'react';
import { List, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { fetchTodos, selectFilteredTodos } from '../features/todos/todosSlice';
import TodoItem from './TodoItem';

export default function TodoList() {
	const dispatch = useAppDispatch();
	const { items, filter, status } = useAppSelector((s) => s.todos);
	const filtered = selectFilteredTodos(items, filter);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	if (status === 'loading' && items.length === 0) {
		return <Typography role="status" aria-live="polite">Loading...</Typography>;
	}

	if (filtered.length === 0) {
		return <Typography color="text.secondary" role="status" aria-live="polite">No tasks</Typography>;
	}

	return (
		<Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
			<List aria-label="Todo items">
				{filtered.map((t) => (
					<TodoItem key={t.id} item={t} />
				))}
			</List>
		</Paper>
	);
}


