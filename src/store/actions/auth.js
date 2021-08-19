import * as actionTypes from './actionTypes';

import {
    AUTH_START, 
    AUTH_SUCCESS, 
    AUTH_FAIL, 
    AUTH_LOGOUT, 
    SET_AUTH_REDIRECT_PATH,
} from '../reducers/auth';

import {
	LOG_INITIAL_DATA
} from '../reducers/journalEntry';

export const authStart = () => {
	return AUTH_START()
}

export const authSuccess = (token, userId, diaplayName, logInEmail, isNewUser) => {
    return AUTH_SUCCESS({
        idToken: token,
		userId: userId,
		name: diaplayName,
		email: logInEmail,
		isNewUser: isNewUser
    })
}

export const authFail = (error) => {
	return AUTH_FAIL({
		error: error
	})
}

export const logout = () => {
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

export const auth = (email, password, isSignup, journalData) => {
	return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignup: isSignup,
	journalData: journalData
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

export const loadInitialData = (token, userId) => {
	return {
		type: actionTypes.LOAD_INITIAL_DATA,
		token: token,
		userId: userId
	}
}

export const logInitialData = (journalData, userId) => {
	return LOG_INITIAL_DATA({
		journalData: journalData,
		userId: userId
	})
}

export const postInitialDataOnSignup = (journalData, currentToken, userId) => {
	return {
		type: actionTypes.POST_INITIAL_DATA_ON_SIGNUP,
		journalData: journalData,
		currentToken: currentToken,
		userId: userId
	}
}