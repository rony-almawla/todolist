import { Box, Paper } from '@mui/material';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import BrandHeader from '../components/BrandHeader';

export default function TodoPage() {
    return (
        <Box>
            <BrandHeader />
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'transparent' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TodoList />
                    <TodoInput />
                </Box>
            </Paper>
        </Box>
    );
}


