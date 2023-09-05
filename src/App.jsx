import './App.css';
import NewOrder from './routes/Order/NewOrder';
import NewProduct from './routes/Products/NewProduct/NewProduct';
import Products from './routes/Products/Products';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Products />} />
				<Route path='/create' element={<NewProduct />} />
				<Route path='/order' element={<NewOrder />} />
			</Routes>
		</>
	);
}

export default App;
