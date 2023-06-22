import { Container } from '@mui/material';
import { Header } from './Header';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const Layout = ({ children }: Props) => {
	return (
		<Container maxWidth="lg">
			<Header sections={[]} title="Connectify" />
			<main>{children}</main>
		</Container>
	);
};
