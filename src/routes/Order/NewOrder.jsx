import { useEffect, useState } from 'react';
import './NewOrder.css';
import { useNavigate } from 'react-router-dom';

const WAREHOUSE_API = `${import.meta.env.VITE_WAREHOUSE_API_URL}`;
const STORE_API = `${import.meta.env.VITE_STORE_API_URL}`;

export default function NewOrder() {
	const [form, setForm] = useState({
		productId: '',
		quantity: '',
	});
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		e.preventDefault();

		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};
	// extraer a custom hook
	useEffect(() => {
		if (form.productId !== '') {
			fetch(`${WAREHOUSE_API}product/${form.productId}`)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					throw response;
				})
				.then((data) => {
					const price = parseFloat(data.price) * 1.2;
					setMessage(`Your product price is: $ ${price}`);
				})
				.catch((err) => setMessage(`Product ID: " ${form.productId} " not found`));
		}
	}, [form.productId]);

	const handleCreate = (e) => {
		e.preventDefault();

		let isCancelled = false;

		const json_string = JSON.stringify({
			product_id: form.productId,
			quantity: form.quantity,
		});

		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: json_string,
		};

		fetch(`${STORE_API}order`, requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw response;
				}
			})
			.then((data) => {
				if (!isCancelled) {
					setMessage(`Order for ${form.quantity} items sent`);
				}
			})
			.catch((err) => console.error(err));

		return () => {
			isCancelled = true;
		};
	};

	return (
		<div className='new--order body'>
			<h2 className='title new--order--title'>Create a new product</h2>
			<form className='new--order--form' onSubmit={handleCreate}>
				<fieldset>
					<input
						type='text'
						onChange={handleChange}
						name='productId'
						placeholder="Product's id"
						required
					/>
				</fieldset>
				<fieldset>
					<input
						type='number'
						onChange={handleChange}
						name='quantity'
						placeholder="Product's quantity"
						required
					/>
				</fieldset>
				<button className='button-4'>Create order</button>
			</form>
			<h3 className='new--order--message'>{message}</h3>
		</div>
	);
}
