import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import BrandHeader from '../components/BrandHeader';
import { useAppDispatch } from '../hooks/storeHooks';
import { login } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await dispatch(login({ email, password })).unwrap();
            navigate('/');
        } catch (e) {
            alert((e as Error).message);
        }
    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ pt: 2 }}>
            <BrandHeader />
            <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2.5} sx={{ width: 460, maxWidth: '100%' }}>
                    <Typography variant="h4" fontWeight={600} align="center" sx={{ mb: 1 }}>Login</Typography>
                    <TextField
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        fullWidth
                    />
                    <TextField
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        required
                        fullWidth
                    />
                    <Typography variant="body2" color="text.secondary" textAlign="left">
                        Don’t have an account yet? <Link to="/signup">Signup</Link>
                    </Typography>
                    <Button type="submit" variant="contained" sx={{ bgcolor: 'common.white', color: '#2E3239', width: 161, height: 36, borderRadius: '9px', alignSelf: 'center', '&:hover': { bgcolor: '#f0f0f0' } }}>Login</Button>
                </Box>
            </Box>
        </Box>
    );
}


