import { useState } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import BrandHeader from '../components/BrandHeader';
import { useAppDispatch } from '../hooks/storeHooks';
import { signup } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setconfirmPassword] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (password !== confirmpassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            await dispatch(signup({ email, password })).unwrap();
            navigate('/');
        } catch (e) {
            alert((e as Error).message);
        }
    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ pt: 2 }}>
            <BrandHeader />
            <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
            <Paper sx={{ p: { xs: 3, sm: 4 }, width: 440, maxWidth: '100%', borderRadius: 3, boxShadow: 6 }}>
            <Typography variant="h4" fontWeight={600} align="center" sx={{ mb: 1 }}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2.5}>
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
                    <TextField
                        placeholder="Confirm Password"
                        value={confirmpassword}
                        onChange={(e) => setconfirmPassword(e.target.value)}
                        type="confirmpassword"
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 1, bgcolor: 'common.white', color: '#2e3239', '&:hover': { bgcolor: '#f0f0f0' } }} fullWidth>Register</Button>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        Have an account? <Link to="/login">Log in</Link>
                    </Typography>
                </Box>
            </Paper>
            </Box>
        </Box>
    );
}


