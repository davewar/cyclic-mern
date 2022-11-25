import * as ROUTES from '../constants/routes';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import Error from '../components/Error';
import Navbar from '../components/Navbar';

import Products from '../components/products/Products';
import ProductDetails from '../components/products/ProductDetails';

import Cart from '../components/cart/Cart';

import Login from '../components/accounts/Login';
import Register from '../components/accounts/Register';
import History from '../components/accounts/History';
import OrderDetails from '../components/accounts/orderDetails';

//activate account for first login
import ActivateAccount from '../components/accounts/ActivateAccount';
//request a new password
import ResetAccount from '../components/accounts/ResetAccount';
//request a new password
import ResetPassword from '../components/accounts/ResetPassword';

//admin
import CreateProduct from '../components/admin/products';
import AmendProduct from '../components/admin/amendProducts';

const Pages = () => {
	return (
		<>
			<Router>
				<Navbar />

				<Switch>
					<Route exact path={ROUTES.HOME} component={Home} />

					<Route exact path={ROUTES.PRODUCTS} exact component={Products} />
					<Route
						exact
						path={ROUTES.PRODUCTS + '/:id'}
						component={ProductDetails}
					/>
					<Route path={ROUTES.CART} component={Cart}></Route>

					<Route path={ROUTES.HISTORY} exact component={History} />
					<Route
						exact
						path={ROUTES.HISTORY + '/:id'}
						component={OrderDetails}
					/>

					<Route path={ROUTES.LOGIN} component={Login} />
					<Route path={ROUTES.REGISTER} component={Register} />
					<Route
						path={ROUTES.ACTIVATE + '/:id'}
						component={ActivateAccount}
						exact
					/>
					<Route path={ROUTES.RESET} component={ResetAccount} exact />
					<Route
						path={ROUTES.RESETPASSWORD + '/:id'}
						component={ResetPassword}
						exact
					/>

					<Route path={ROUTES.CREATE_PRODUCT} exact component={CreateProduct} />
					<Route
						path={ROUTES.AMEND_PRODUCT + '/:id'}
						component={AmendProduct}
					/>

					<Route path='*'>
						<Error />
					</Route>
				</Switch>
			</Router>
		</>
	);
};

export default Pages;
