import { Tabs, Tab, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { setFilter } from '../features/todos/todosSlice';
import { useNavigate } from 'react-router-dom';

export default function TodoFilterTabs() {
	const dispatch = useAppDispatch();
	const filter = useAppSelector((s) => s.todos.filter);
	const navigate = useNavigate();

	function handleChange(_: unknown, value: 'all' | 'active' | 'completed') {
		dispatch(setFilter(value));
		navigate(value === 'all' ? '/' : `/${value}`);
	}

	return (
		<Paper sx={{ mb: 2 }}>
			<Tabs
				value={filter}
				onChange={handleChange}
				aria-label="Filter todos"
				variant="fullWidth"
			>
				<Tab value="all" label="All" />
				<Tab value="active" label="Active" />
				<Tab value="completed" label="Completed" />
			</Tabs>
		</Paper>
	);
}


