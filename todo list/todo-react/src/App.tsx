import { Container, CssBaseline } from '@mui/material';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/storeHooks';
import { setFilter } from './features/todos/todosSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (path === '' || path === 'all' || path === 'active' || path === 'completed') {
      const filter = (path === '' ? 'all' : path) as 'all' | 'active' | 'completed';
      dispatch(setFilter(filter));
    }
  }, [location.pathname, dispatch]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<TodoPage />} />
            <Route path="/all" element={<TodoPage />} />
            <Route path="/active" element={<TodoPage />} />
            <Route path="/completed" element={<TodoPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}
