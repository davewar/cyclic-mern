import React from 'react';

export default function PayPal({ total, tranSuccess }) {
	const [paid, setPaid] = React.useState(false);
	const [error, setError] = React.useState(null);
	const paypalRef = React.useRef();

	console.log(total);

	// To show PayPal buttons once the component loads
	React.useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{
								description: 'DWShop',
								amount: {
									currency_code: 'GBP',
									value: `${total}`,
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					const order = await actions.order.capture();
					setPaid(true);
					tranSuccess(order);
					// console.log(order);
				},
				onError: (err) => {
					// setError(err);
					setPaid(false);
					console.error(err);
				},
			})
			.render(paypalRef.current);
	}, []);

	// If the payment has been made
	if (paid) {
		return <div>Payment successful</div>;
	}

	// If any error occurs
	if (error) {
		return <div>Error Occurred in processing payment. Please try again.</div>;
	}

	// Default Render
	return (
		<div>
			<h4>Total £{total}</h4>
			<div ref={paypalRef} />
		</div>
	);
}
