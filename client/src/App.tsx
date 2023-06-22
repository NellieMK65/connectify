import { Routes, Route } from 'react-router-dom';
import { Signup } from './pages';
import { Layout } from './components';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout>Home</Layout>} />
			<Route path="/signup" element={<Signup />} />
		</Routes>
	);
}

export default App;
