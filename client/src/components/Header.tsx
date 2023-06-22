import {
	Toolbar,
	Button,
	Typography,
	IconButton,
	Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderProps {
	sections: ReadonlyArray<{
		title: string;
		url: string;
	}>;
	title: string;
}

export const Header = (props: HeaderProps) => {
	const { sections, title } = props;

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
				<IconButton>{/* <SearchIcon /> */}</IconButton>
				<Link to="/signup">
					<Button variant="outlined" size="small">
						Sign up
					</Button>
				</Link>
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
