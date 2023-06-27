import { ReactNode, createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// some ts stuff - ignore
interface User {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	phone?: string;
	email: string;
	bio?: string;
	avatar?: string;
	created_at: Date;
	updated_at: Date;
}

interface ContextState {
	isAuthenticated: boolean;
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

interface Props {
	children: ReactNode;
}

// end of ts stuff

export const AuthContext = createContext<ContextState>({
	isAuthenticated: false,
	user: null,
	login: () => null,
	logout: () => null,
});

export const AuthProvider = ({ children }: Props) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	const navigate = useNavigate();

	const login = (user: User) => {
		localStorage.setItem('user', JSON.stringify(user));
		setUser(user);
		setIsAuthenticated(true);
		navigate('/');
	};

	const logout = () => {
		fetch(`/sessions/${user?.id}`, {
			method: 'DELETE',
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((res) => {
				localStorage.removeItem('user');
				setUser(null);
				setIsAuthenticated(false);
			});
	};

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			setUser(JSON.parse(user));
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
