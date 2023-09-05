import { useNavigate } from 'react-router-dom';
import './NewProduct.css';
import { useState } from 'react';

const API_URL = `${import.meta.env.VITE_WAREHOUSE_API_URL}`;

export default function NewProduct() {
	const [form, setForm] = useState({
		name: '',
		price: '',
		quantity: '',
	});
	const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreate = (e) => {
		e.preventDefault();

		const json_string = JSON.stringify(form);
		const requestOptions = {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: json_string,
		};

		fetch(`${API_URL}product`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then((data) => {
				console.log(data)
				navigate('/');
			})
			.catch((err) => console.error(err));
	};

	return (
		<div className='new--product body'>
			<h2 className='title new--peoduct--title'>Create a new product</h2>
			<form className='new--product--form' onSubmit={handleCreate}>
				<fieldset>
					<input
						type='text'
						onChange={handleChange}
						name='name'
						placeholder="Product's name"
						required
					/>
				</fieldset>
				<fieldset>
					<input
						type='number'
						onChange={handleChange}
						name='price'
						placeholder="Product's price"
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
				<button className='button-4'>Create product</button>
			</form>
		</div>
	);
}
