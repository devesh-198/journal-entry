import * as actionTypes from './actionTypes';
import {
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_LOGOUT, 
    SET_AUTH_REDIRECT_PATH
} from '../reducers/auth';

export const authStart = () => {
	return AUTH_START()
}

export const authSuccess = (token, userId) => {
    return AUTH_SUCCESS({
        idToken: token,
		userId: userId
    })
}

export const authFail = (error) => {
	return AUTH_FAIL({
		error: error
	})
}

export const logout = () => {
	// localStorage.removeItem('token')
	// localStorage.removeItem('expirationDate')
	// localStorage.removeItem('userId')
	return {
		type: actionTypes.AUTH_INITITATE_LOGOUT
	}
}

export const logoutSucceed = () => {
	return AUTH_LOGOUT()
}

export const checkAuthTimeout = (expirationTime) => {
	return {
		type: actionTypes.AUTH_CHECK_TIMEOUT,
		expirationTime: expirationTime
	}
}

export const auth = (email, password, isSignup) => {
	return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup
  }
}

export const setAuthRedirectPath = (path) => {
	return SET_AUTH_REDIRECT_PATH({
		path: path
	})
}

export const authCheckState = () => {
	return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}