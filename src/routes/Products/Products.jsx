import { Link } from 'react-router-dom';
import './Products.css';
import { useEffect, useState } from 'react';

const API_URL = `${import.meta.env.VITE_WAREHOUSE_API_URL}`;

export default function Products() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		let isCancelled = false;

		fetch(`${API_URL}product`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				if (!isCancelled) {
					setProducts(data.reverse());
				}
			})
			.catch((err) => console.error(err));

		return () => {
			isCancelled = true;
		};
	}, []);

	const handleDelete = (id) => {
		const requestOptions = {
			method: 'DELETE',
		};
		fetch(`${API_URL}product/${id}`, requestOptions)
			.then((response) => {
				if (response.ok) {
					location.reload();
				}
				throw response;
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className='body products--div'>
			<h2 className='title product--title'>Products</h2>
			<div className='products--add--container'>
				<Link to={`/create`} className='button-4 product--add'>
					Add
				</Link>
				<table className='table--products'>
					<thead className='table--products--head'>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Name</th>
							<th scope='col'>Price</th>
							<th scope='col'>Quantity</th>
							<th scope='col'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr className='table--products--row' key={product.pk}>
								<td className='table--products--td'>{product.pk}</td>
								<td className='table--products--td'>{product.name}</td>
								<td className='table--products--td'>{product.price}</td>
								<td className='table--products--td'>{product.quantity}</td>
								<td className='table--products--td'>
									<p
										className='table--products--delete'
										onClick={() => {
											handleDelete(product.pk);
										}}
									>
										Delete
									</p>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className='products--order--container'>
				<Link to={`/order`} className='button-4 product--order'>
					Order
				</Link>
			</div>
		</div>
	);
}
