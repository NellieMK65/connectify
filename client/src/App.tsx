import { Routes, Route } from 'react-router-dom';
import { Login, Signup } from './pages';
import { Layout } from './components';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout>Home</Layout>} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
