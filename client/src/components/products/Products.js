import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { ShoppingContext } from '../../contexts/shopping';
import Filters from './Filters';
import { UserContext } from '../../contexts/user';

const Products = () => {
	const { addItem, products, setProducts, search, categorySelection } =
		useContext(ShoppingContext); //global

	const { isAdmin, accessToken } = useContext(UserContext);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	let newData;

	const getProducts = async () => {
		try {
			const res = await fetch('/api/products');
			const data = await res.json();
			// console.log(data);

			setProducts(data);
			setLoading(false);
		} catch (err) {
			console.log(err.message);
			setError(true);
		}
	};

	const deleteProduct = async (id) => {
		try {
			const res = await fetch('/api/products/' + id, {
				method: 'DELETE',
				body: JSON.stringify({ id }),
				headers: {
					'Content-Type': 'application/json',
					credentials: 'include',
					Authorization: accessToken,
				},
			});

			const data = await res.json();

			// console.log(data);

			if (data !== 'item deleted') {
				alert('Admin access lasts 10 mins, please refresh page and try again.');
			} else {
				alert(data);
			}
		} catch (err) {
			console.log(err.message);
			setError(true);
		}
	};

	useEffect(() => {
		let isActive = true;

		getProducts();
		/*eslint-disable */
		return () => {
			isActive = false;
		};
		/*eslint-enable */
	}, []);

	if (categorySelection === 'all') {
		newData = products;
	} else {
		newData = products.filter(
			(item) => item.category.toLowerCase() === categorySelection.toLowerCase()
		);
	}

	//search box
	newData = newData.filter((item) =>
		item.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			{loading && <div>Loading........</div>}

			{error && (
				<div className='mb-2'>
					Error with loading of page. Please refresh page.
				</div>
			)}

			<Filters />

			<div className='container d-flex flex-row flex-wrap justify-content-between col-xs-12  col-sm-12 p-0 '>
				{newData.map((item) => {
					//    console.log();
					return (
						<div
							className='card col-xs-12 col-sm-12 col-md-12 col-lg-5  mb-5 mt-5
							 p-0  '
							id='card-css'
							// className='card col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3 p-0 '
							key={item._id}
							style={styledObj}
						>
							<img src={item.image} className='card-img-top' alt='' />

							<div className='card-body'>
								<h2 className='card-title'>{item.title}</h2>
								<p className='card-text'>Category: {item.category}</p>
								<span>Price: ??{item.price}</span>
								{isAdmin && (
									<p className='card-text'>Stock: {item.countInStock}</p>
								)}
								<p className='card-text'>Description: {item.description}</p>
							</div>

							<div className='card-body'>
								<button
									className='btn btn-primary border'
									onClick={() => addItem(item)}
								>
									BUY
								</button>
								<button className='btn border'>
									<Link to={`/products/${item._id}`}>VIEW</Link>
								</button>
							</div>

							{isAdmin && (
								<div className='card-body'>
									<button
										className='btn btn-danger border'
										onClick={() => deleteProduct(item._id)}
									>
										DELETE
									</button>
									<button className='btn btn-warning border'>
										<Link to={`/product_amend/${item._id}`}>EDIT</Link>
									</button>
								</div>
							)}
						</div>
					);
				})}
			</div>

			{!loading && newData.length === 0 ? <h1>No items found</h1> : null}
		</>
	);
};

const styledObj = {
	// width: '40%',
	// minWidth: '500px',
};

export default Products;
