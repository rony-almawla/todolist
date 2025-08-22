import { useState } from 'react';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import { useAppDispatch } from '../hooks/storeHooks';
import { createTodo } from '../features/todos/todosSlice';

export default function TodoInput() {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState('');

	function handleAdd() {
		const trimmed = title.trim();
		if (!trimmed) return;
		dispatch(createTodo(trimmed));
		setTitle('');
	}

	return (
		<Box display="flex" gap={1} component="form" onSubmit={(e) => { e.preventDefault(); handleAdd(); }} aria-label="Add new todo">
			<TextField
				fullWidth
				placeholder="New Note"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				inputProps={{ 'aria-label': 'Todo title' }}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end" sx={{ ml: 2 }}>
							<Button
								variant="contained"
								size="small"
								onClick={handleAdd}
								aria-label="Add todo"
								sx={{
									bgcolor: 'common.white',
									color: '#2E3239',
									fontSize: 10,
									whiteSpace: 'nowrap',
									display: 'inline-flex',
									flexDirection: 'column',
									width: '161px',
									height: '48px',
									borderRadius: '9px',
									pt: '12px',
									pr: '24px',
									pb: '12px',
									pl: '20px',
									gap: '10px',
									minWidth: '161px',
									'&:hover': { bgcolor: '#f0f0f0' },
								}}
							>
								Add New Note
							</Button>
						</InputAdornment>
					),
				}}
				sx={{
					'.MuiFilledInput-root': {
						minHeight: '80px',
						borderRadius: '10px',
					},
					'.MuiFilledInput-input': {
						py: '16px',
						px: '30px',
					},
				}}
			/>
		</Box>
	);
}


