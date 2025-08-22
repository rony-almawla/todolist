import type { UserAccount } from '../types/auth';

const AUTH_USER_KEY = 'auth:user';
const AUTH_USERS_KEY = 'auth:users';

function delay(ms = 150) { return new Promise((r) => setTimeout(r, ms)); }

function readUsers(): UserAccount[] { return JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]'); }
function writeUsers(users: UserAccount[]) { localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users)); }

export async function apiSignup(email: string, password: string): Promise<UserAccount> {
	await delay();
	const users = readUsers();
	if (users.some((u) => u.email === email)) throw new Error('Email already registered');
	const user: UserAccount = { id: crypto.randomUUID(), email };
	writeUsers([...users, user]);
	localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
	localStorage.setItem(`auth:pwd:${user.id}`, password);
	return user;
}

export async function apiLogin(email: string, password: string): Promise<UserAccount> {
	await delay();
	const users = readUsers();
	const user = users.find((u) => u.email === email);
	if (!user) throw new Error('Invalid credentials');
	const saved = localStorage.getItem(`auth:pwd:${user.id}`);
	if (saved !== password) throw new Error('Invalid credentials');
	localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
	return user;
}

export async function apiLogout(): Promise<void> {
	await delay();
	localStorage.removeItem(AUTH_USER_KEY);
}

export async function apiCurrentUser(): Promise<UserAccount | null> {
	await delay();
	const raw = localStorage.getItem(AUTH_USER_KEY);
	return raw ? (JSON.parse(raw) as UserAccount) : null;
}


