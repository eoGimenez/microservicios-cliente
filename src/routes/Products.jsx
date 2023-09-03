import { Link } from 'react-router-dom';
import './Products.css';
import { useState } from 'react';

export default function Products() {
    const [products, setProducts] = useState([])

	return (
		<div className='body products--div'>
			<h2 className='title product--title'>Products</h2>
			<div className='products--add--container'>
				<Link to={`/`} className='button-4 product--add'>
					Add
				</Link>
				<table className='table--products'>
					<thead className='table--products--head'>
						<th scope='col'>#</th>
						<th scope='col'>Name</th>
						<th scope='col'>Price</th>
						<th scope='col'>Quantity</th>
						<th scope='col'>Actions</th>
					</thead>
					<tbody>
                        {
                            products.map(product => (
                                <tr className='table--products--row' key={product.id}>
                                    <td className='table--products--td'>{product.id}</td>
                                    <td className='table--products--td'>{product.name}</td>
                                    <td className='table--products--td'>{product.price}</td>
                                    <td className='table--products--td'>{product.quantity}</td>
                                    <td className='table--products--td'>
                                        <p className='table--products--delete' onClick={null}>Delete</p>
                                    </td>
                          
                                </tr>
                            ))
                        }

                    </tbody>
				</table>
			</div>
			<div className='products--order--container'>
				<Link to={`/`} className='button-4 product--order'>
					Order
				</Link>
			</div>
		</div>
	);
}
