import React, { useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { UserContext } from '../../contexts/user';

const ResetPassword = () => {
	const history = useHistory();
	const { id } = useParams();

	const { setAccessToken } = useContext(UserContext); //global user

	const [signUpErr, setSignUpErr] = useState('');

	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [confPassword, setconfPassword] = useState('');
	const [emailErr, setemailErr] = useState('');
	const [passwordErr, setpasswordErr] = useState('');
	const [confPasswordErr, setconfPasswordErr] = useState('');
	const [success, setSuccess] = useState('');
	const handleChange = (e, name) => {
		//clear
		setSignUpErr('');

		const user = {};
		const emailRegEx = RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		user[name] = e.target.value;
		// validations
		switch (name) {
			case 'email':
				setemail(user.email);
				!emailRegEx.test(user.email)
					? setemailErr('Invalid Email!')
					: setemailErr('');
				break;
			case 'password':
				setpassword(user.password);

				user.password.length < 6
					? setpasswordErr('Password must be at least 6 characters!')
					: setpasswordErr('');
				break;
			case 'confPassword':
				setconfPassword(user.confPassword);
				user.confPassword !== password
					? setconfPasswordErr('Passwords do not match!')
					: setconfPasswordErr('');
				break;
			default:
				break;
		}
	};

	const handleSignUp = async (e) => {
		e.preventDefault();

		if (
			email &&
			password &&
			confPassword &&
			!emailErr &&
			!passwordErr &&
			!confPasswordErr
		) {
			//clear
			setSignUpErr('');
			setSuccess('');
			try {
				const res = await fetch('/user/reset', {
					method: 'POST',
					body: JSON.stringify({ email, password, accesstoken: id }),
					headers: {
						'Content-Type': 'application/json',
						credentials: 'include',
					},
				});
				const data = await res.json();
				console.log(data);

				if (data.errors) {
					setSignUpErr(data.errors);
				}
				if (data.msg) {
					console.log(data);

					setSuccess(data.msg);
				}
			} catch (err) {
				console.log(err.message);
			}
		}
	};

	return (
		<div className='container '>
			<div className='row mt-5  justify-content-center align-items-center '>
				<div className='col-xs-12 sign-in '>
					<h2 className='text-center'>Create your Password</h2>
					{signUpErr && (
						<div className='alert alert-danger text-center'>
							<span className='text-danger text-capitalize'>{signUpErr}</span>
						</div>
					)}

					{success && (
						<div className='alert alert-success text-center'>
							<span className='text-success text-capitalize'>{success}</span>
						</div>
					)}
					<form className='mt-4' onSubmit={handleSignUp}>
						<div className='form-group'>
							<label htmlFor='email'>Enter Email Address</label>
							<input
								type='email'
								name='email'
								className={
									emailErr
										? 'form-control is-invalid'
										: !emailErr && email.length
										? 'form-control is-valid'
										: 'form-control'
								}
								id='email'
								placeholder='Email Address'
								onChange={(e) => handleChange(e, 'email')}
							/>
							{emailErr && <small className='text-danger'>{emailErr}</small>}
						</div>
						<div className='form-group'>
							<label htmlFor='password'>Enter Password</label>
							<input
								type='password'
								name='password'
								className={
									passwordErr
										? 'form-control is-invalid'
										: !passwordErr && password.length
										? 'form-control is-valid'
										: 'form-control'
								}
								id='password'
								placeholder='Password'
								onChange={(e) => handleChange(e, 'password')}
							/>
							{passwordErr && (
								<small className='text-danger'>{passwordErr}</small>
							)}
						</div>
						<div className='form-group'>
							<label htmlFor='Confirm Password'>Confirm Password</label>
							<input
								type='password'
								name='confPassword'
								className={
									confPasswordErr
										? 'form-control is-invalid'
										: !confPasswordErr && !passwordErr && confPassword
										? 'form-control is-valid'
										: 'form-control'
								}
								id='confPassword'
								placeholder='Password'
								onChange={(e) => handleChange(e, 'confPassword')}
							/>
							{confPasswordErr && (
								<small className='text-danger'>{confPasswordErr}</small>
							)}
						</div>
						<input type='submit' className='btn btn-primary' value='Submit' />
					</form>
					<p className='float-left mt-5'>
						<Link to='/signin'>Log In</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
