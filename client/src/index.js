import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingProvider from './contexts/shopping';
import UserProvider from './contexts/user';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();
ReactDOM.render(
	<React.StrictMode>
		<UserProvider>
			<ShoppingProvider>
				<App />
			</ShoppingProvider>
		</UserProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
