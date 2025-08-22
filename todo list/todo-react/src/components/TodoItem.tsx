import { Checkbox, IconButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import type { TodoItem as Todo } from '../types/todo';
import { useAppDispatch } from '../hooks/storeHooks';
import { deleteTodo, toggleTodo } from '../features/todos/todosSlice';

interface Props {
	item: Todo;
}

export default function TodoItem({ item }: Props) {
	const dispatch = useAppDispatch();
	const labelId = `checkbox-list-label-${item.id}`;

	return (
		<ListItem
			disableGutters
			secondaryAction={
				<IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteTodo(item.id))} sx={{ color: 'text.secondary' }}>
					<DeleteIcon />
				</IconButton>
			}
		>
			<ListItemIcon>
				<Checkbox
					edge="start"
					checked={item.completed}
					tabIndex={-1}
					disableRipple
					inputProps={{ 'aria-labelledby': labelId }}
					onChange={() => dispatch(toggleTodo(item.id))}
				/>
			</ListItemIcon>
			<ListItemText id={labelId} primary={item.title} sx={{ textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'text.secondary' : 'text.primary' }} />
		</ListItem>
	);
}


