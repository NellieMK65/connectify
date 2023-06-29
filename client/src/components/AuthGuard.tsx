import { ReactNode, useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import { Layout } from './Layout';
import { useLocation, useNavigate } from 'react-router-dom';

interface Props {
	children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
	const { isAuthenticated } = useContext(AuthContext);

	const navigate = useNavigate();

	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated) {
			// navigate user to login
			navigate(`/login?returnUrl=${location.pathname}`);
		}
	}, [isAuthenticated]);

	return <Layout>{children}</Layout>;
};
