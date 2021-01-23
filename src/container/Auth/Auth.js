import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

const Auth = props => {
	const [controls, setControls] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Mail Address',
			},
			value: '',
			validation: {
				required: true,
				isEmail: true
			},
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'min 8 character',
			},
			value: '',
			validation: {
				required: true,
				minlength: 6
			},
			valid: false,
			touched: false
		}
	})
	const [isSignup, setIsSignup] = useState(true)
	const [googleAuthStatus, setgoogleAuthStatus] = useState(false)

	const loading = useSelector(state => state.auth.loading)
	const error = useSelector(state => state.auth.error)
	const isAuthenticated = useSelector(state => state.auth.token !== null)
	const authRedirectPath = useSelector(state => state.auth.authRedirectPath)

	const dispatch = useDispatch()

	const onAuth = (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
	const googleAuthSuccess = (token, userId) => dispatch(actions.authSuccess(token, userId))
	const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/journal-entry')), [dispatch])

	useEffect(() => {
		if (isAuthenticated || googleAuthStatus) {
			onSetAuthRedirectPath()
		}
	}, [isAuthenticated, onSetAuthRedirectPath,googleAuthStatus])

	const inputChangedHandler = (event, controlName) => {
		const updatedControls = updateObject(controls, {
			[controlName]: updateObject(controls[controlName], {
				value: event.target.value,
				valid: checkValidity(event.target.value, controls[controlName].validation),
				touched: true
			})
		})
		setControls(updatedControls)
	}

	const submitHandler = (event) => {
		event.preventDefault();
		onAuth(controls.email.value, controls.password.value, isSignup)
	}

	const switchAuthModeHandler = (mode) => {
		setIsSignup(mode)
	}

	const googleLoginHandler = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				setgoogleAuthStatus(true)
				// This gives you a Google Access Token. You can use it to access the Google API.
				const token = result.credential.accessToken;
				// The signed-in user info.
				const userId = result.user.uid;
				const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    			localStorage.setItem('expirationDate', expirationDate)
    			localStorage.setItem('token', token)
    			localStorage.setItem('userId', userId)
    			googleAuthSuccess(token, userId)
				console.log(result)
			}).catch((error) => {
				console.log(error)
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				const credential = error.credential;
				// ...
			})
	}

	const formElementsArray = [];
	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key],
		})
	}

	const form = formElementsArray.map(formElement => (
		<Input
			key={formElement.id}
			elementType={formElement.config.elementType}
			elementConfig={formElement.config.elementConfig}
			value={formElement.config.value}
			invalid={!formElement.config.valid}
			shouldValidate={formElement.config.validation}
			touched={formElement.config.touched}
			changed={(event) => inputChangedHandler(event, formElement.id)}
		/>
	))

	let loadingMessage = null
	if (loading) {
		loadingMessage = <Spinner />
	}


	let errorMessage = null

	if (error) {
		errorMessage = (
			<p>{error.message}</p>
		)
	}

	let authRedirect = null;

	if (isAuthenticated) {
		authRedirect = <Redirect to={authRedirectPath} />
	}

	return (
		<>
			{authRedirect}
			<div>
				<div>
					<h2>Sign in</h2>
					<p>We're glad to have you back</p>
				</div>
				<div>
					<form onSubmit={submitHandler}>
						{form}
						{isSignup === false && loadingMessage}
						{isSignup === false && errorMessage}
						<Button
							clicked={() => switchAuthModeHandler(false)}
							btnType="Success"
						>Sign in</Button>
					</form>
				</div>
			</div>
			<div>
				<div>
					<h2>Sign up</h2>
					<p>We're happy to see you.<br />Hope you have a plesent experience<br />Create an account to start journaling.</p>
				</div>
				<div>
					<form onSubmit={submitHandler}>
						{form}
						{isSignup === true && loadingMessage}
						{isSignup === true && errorMessage}
						<Button
							clicked={() => switchAuthModeHandler(true)}
							btnType="Success"
						>Create an account</Button>
					</form>
				</div>
				<div>
					<button onClick={googleLoginHandler}>Google Login</button>
				</div>
			</div>
		</>
	)
}

export default Auth;