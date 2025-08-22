import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UserAccount } from '../../types/auth';
import { apiCurrentUser, apiLogin, apiLogout, apiSignup } from '../../api/authApi';

interface AuthState {
	user: UserAccount | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	status: 'idle',
	error: null,
};

export const fetchCurrentUser = createAsyncThunk('auth/current', apiCurrentUser);
export const signup = createAsyncThunk('auth/signup', async (payload: { email: string; password: string }) => {
	return apiSignup(payload.email, payload.password);
});
export const login = createAsyncThunk('auth/login', async (payload: { email: string; password: string }) => {
	return apiLogin(payload.email, payload.password);
});
export const logout = createAsyncThunk('auth/logout', async () => {
	await apiLogout();
	return;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrentUser.pending, (s) => { s.status = 'loading'; s.error = null; })
			.addCase(fetchCurrentUser.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload; })
			.addCase(fetchCurrentUser.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message ?? 'Failed'; })
			.addCase(signup.fulfilled, (s, a) => { s.user = a.payload; })
			.addCase(login.fulfilled, (s, a) => { s.user = a.payload; })
			.addCase(logout.fulfilled, (s) => { s.user = null; });
	},
});

export default authSlice.reducer;


