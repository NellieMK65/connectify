import { Routes, Route } from 'react-router-dom';
import { Login, Profile, Signup } from './pages';
import { AuthGuard, Layout } from './components';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout>Home</Layout>} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/profile"
				element={
					<AuthGuard>
						<Profile />
					</AuthGuard>
				}
			/>
		</Routes>
	);
}

export default App;
