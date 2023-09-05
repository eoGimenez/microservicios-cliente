import './App.css';
import NewProduct from './routes/Products/NewProduct/NewProduct';
import Products from './routes/Products/Products';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/create' element={<NewProduct />} />
			</Routes>
		</>
	);
}

export default App;
