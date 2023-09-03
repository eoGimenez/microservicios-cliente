import './App.css';
import Products from './routes/Products';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Products />} />
			</Routes>
		</>
	);
}

export default App;
