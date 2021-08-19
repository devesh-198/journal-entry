import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';

import classes from './Auth.module.css';

import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import * as actions from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

const Auth = props => {

	//Sign-in controls.
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
	const journalData = useSelector(state => state.journalEntry.journals)

	const dispatch = useDispatch()

	const onAuth = (email, password, isSignup, journalData) => dispatch(actions.auth(email, password, isSignup, journalData))
	const googleAuthSuccess = (token, userId, displayName, email, isNewUser) => dispatch(actions.authSuccess(token, userId, displayName, email, isNewUser))
	const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/journal-entry')), [dispatch])
	const postInitialDataOnSignupAction = useCallback((journalData, currentToken, userId) => dispatch(actions.postInitialDataOnSignup(journalData, currentToken, userId)), [dispatch])
	const loadInitialDataAction = (token, userId) => dispatch(actions.loadInitialData(token, userId))

	useEffect(() => {
		if (isAuthenticated || googleAuthStatus) {
			onSetAuthRedirectPath()
		}
	}, [isAuthenticated, onSetAuthRedirectPath, googleAuthStatus])

	//Updates the state of Sign-in controls object.
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

	//Handles the submition of the sign-in or sign-up form. 
	const submitHandler = (event) => {
		event.preventDefault();
		onAuth(controls.email.value, controls.password.value, isSignup, journalData)
	}

	//switches the authentication mode to true if the user is creating an new account.
	const switchAuthModeHandler = (mode) => {
		setIsSignup(mode)
	}

	//google OAuth login handler
	const googleLoginHandler = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				setgoogleAuthStatus(true)

				// This gives you a Google Access Token. You can use it to access the Google API.
				// const token = result.credential.idToken;

				// The signed-in user info.
				const userId = result.user.uid;
				const displayName = result.user.displayName;
				const email = result.user.email;
				const isNewUser = result.additionalUserInfo.isNewUser;

				// This is to additionally extract the IdToken to be used with oAuth authentications.
				firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
					// Send token to your backend via HTTPS
					const token = idToken

					const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

					localStorage.setItem('expirationDate', expirationDate)
					localStorage.setItem('token', token)
					localStorage.setItem('userId', userId)
					localStorage.setItem('displayName', displayName)
					localStorage.setItem('email', email)

					googleAuthSuccess(token, userId, displayName, email, isNewUser)
					
					if(isNewUser) {
						postInitialDataOnSignupAction(journalData, token, userId)
					} else {
						loadInitialDataAction(token, userId)
					}

				}).catch((error) => {
					// Handle error
					// console.log(error.message)
					alert(error.message)
				});
				// console.log(result)
			}).catch((error) => {
				// console.log(error)
				// Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				alert(error.message)

				// The email of the user's account used.
				// const email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				// const credential = error.credential;
				// ...
			})
	}

	//builds the array with the required configuration of the form element. 
	const formElementsArray = [];
	for (let key in controls) {
		formElementsArray.push({
			id: key,
			config: controls[key],
		})
	}

	// Build the form using the form element.
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

	//displays a spinner if "loading" is true.
	let loadingMessage = null
	if (loading) {
		loadingMessage = <Spinner />
	}

	// displays an error message if the error occurs and the error is set to true.
	let errorMessage = null
	if (error) {
		errorMessage = (
			<p>{error.message}</p>
		)
	}

	// Sets the redirect path if login is Successful.
	let authRedirect = null;
	if (isAuthenticated) {
		authRedirect = <Redirect to={authRedirectPath} />
	}

	return (
		<>
			{authRedirect}
			<div className={classes.auth}>
				<div>
					<h2 id="signIn">Sign in</h2>
					<p>We're glad to have you back</p>
				</div>
				<div>
					<form
						className={classes.auth_form} 
						onSubmit={submitHandler}
					>
						{form}
						{isSignup === false && loadingMessage}
						{/* {isSignup === false && errorMessage} */}
						<Button
							disabled={!controls.email.valid && !controls.password.valid}
							clicked={() => switchAuthModeHandler(false)}
							btnType="Success"
						>Sign in</Button>
					</form>
				</div>
			</div>
			<div className={[classes.auth, classes.signUp].join(' ')}>
				<div>
					<h2 id="signUp">Sign up</h2>
					<p>We're happy to see you.<br />Hope you have a plesent experience<br />Create an account to start journaling.</p>
				</div>
				<div>
					<form 
						className={classes.auth_form}
						onSubmit={submitHandler}
					>
						{form}
						{isSignup === true && loadingMessage}
						{/* {isSignup === true && errorMessage} */}
						<Button
							disabled={!controls.email.valid && !controls.password.valid}
							clicked={() => switchAuthModeHandler(true)}
							btnType="Success"
						>Create an account</Button>
					</form>
				</div>
			</div>
			<div className={classes.google_login}>
				<Button
					elementId="googleLogin"
					clicked={googleLoginHandler}
					btnType="Success"
				>SignUp with Google</Button>
			</div>
		</>
	)
}

export default Auth;