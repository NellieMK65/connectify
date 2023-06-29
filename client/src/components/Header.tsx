import {
	Toolbar,
	Button,
	Typography,
	Link as MuiLink,
	Stack,
	Avatar,
} from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context';

interface HeaderProps {
	sections: ReadonlyArray<{
		title: string;
		url: string;
	}>;
	title: string;
}

export const Header = (props: HeaderProps) => {
	const { sections, title } = props;

	const { isAuthenticated, logout } = useContext(AuthContext);

	return (
		<>
			<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Button size="small">Subscribe</Button>
				<Typography
					component="h2"
					variant="h5"
					color="inherit"
					align="center"
					noWrap
					sx={{ flex: 1 }}
				>
					{title}
				</Typography>
				<Stack direction={'row'} spacing={2}>
					{isAuthenticated ? (
						<>
							<Link to="/profile">
								<Avatar />
							</Link>
							<Button onClick={logout}>Logout</Button>
						</>
					) : (
						<>
							<Link to={'/login'}>
								<Button variant="outlined" size="small">
									Login
								</Button>
							</Link>
							<Link to="/signup">
								<Button variant="contained" size="small">
									Sign up
								</Button>
							</Link>
						</>
					)}
				</Stack>
			</Toolbar>
			<Toolbar
				component="nav"
				variant="dense"
				sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
			>
				{sections.map((section) => (
					<MuiLink
						color="inherit"
						// component={Link}
						noWrap
						key={section.title}
						variant="body2"
						href={section.url}
						sx={{ p: 1, flexShrink: 0 }}
					>
						{section.title}
					</MuiLink>
				))}
			</Toolbar>
		</>
	);
};
