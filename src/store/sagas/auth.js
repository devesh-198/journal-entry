import { all, delay } from 'redux-saga/effects';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';
import instance from '../../axios-authenticated';

export function* logoutSaga(action) {
	yield call([localStorage, 'removeItem'], 'token')
	yield call([localStorage, 'removeItem'], 'expirationDate')
	yield call([localStorage, 'removeItem'], 'userId')
	yield call([localStorage, 'removeItem'], 'displayName')
	yield call([localStorage, 'removeItem'], 'email')
	yield put(actions.logoutSucceed())
	yield put(actions.resetState())
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expirationTime * 1000)
	yield put(actions.logout())
}

export function* authUserSaga(action) {

	yield put(actions.authStart())
	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	}
	let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBV9i4-4qlOjhVGoVOx4eg7THddYGbsuCs';
	if (!action.isSignup) {
		url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV9i4-4qlOjhVGoVOx4eg7THddYGbsuCs';
	}

	try {
		const response = yield axios.post(url, authData)
		// console.log(response)

		const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
		yield localStorage.setItem('token', response.data.idToken)
		yield localStorage.setItem('expirationDate', expirationDate)
		yield localStorage.setItem('userId', response.data.localId)
		yield localStorage.setItem('displayName', response.data.displayName)
		yield localStorage.setItem('email', response.data.email)

		let isNewUser = true
		if (response.data.registered) {
			isNewUser = false
		}
		yield localStorage.setItem('isNewUser', isNewUser)

		yield put(actions.authSuccess(response.data.idToken, response.data.localId, response.data.displayName, response.data.email, isNewUser))

		if (isNewUser) {
			yield put(actions.postInitialDataOnSignup(action.journalData, response.data.idToken, response.data.localId))
		} else {
			yield put(actions.loadInitialData(response.data.idToken, response.data.localId))
		}

		yield put(actions.checkAuthTimeout(response.data.expiresIn))
	} catch (error) {
		yield put(actions.authFail(error.response.data.error))
		// console.log(error.response)
		alert(error.response.data.error.message)
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem('token')
	if (!token) {
		yield put(actions.logout())
	} else {
		const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
		if (expirationDate <= new Date()) {
			yield put(actions.logout())
		} else {
			const userId = yield localStorage.getItem('userId')
			const displayName = yield localStorage.getItem('displayName')
			const email = yield localStorage.getItem('email')
			const isNewUser = yield localStorage.getItem('isNewUser')

			yield put(actions.authSuccess(token, userId, displayName, email, isNewUser))
			yield put(actions.loadInitialData(token, userId))
			yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
		}
	}
}
                  
export function* loadInitialDataSaga(action) {
	const userDataQueryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

	try {
		const [journalDataResponse, entryDataResponse] = yield all([
			instance.get('/journal.json' + userDataQueryParams),
			instance.get('/entries.json' + userDataQueryParams)
		])
		// console.log(journalDataResponse, entryDataResponse)

		const journalDataArray = Object.entries(journalDataResponse.data).map(([key, val]) => {
			return val
		})

		for (let val of journalDataArray) {
			yield put(actions.addNewJournalToStore(val.journalKey))
			yield put(actions.addJournalDataToStore(val.journalKey, val.journalName, val.journalDescription))
		}

		const entryDataArray = Object.entries(entryDataResponse.data).map(([key, val]) => {
			return val
		})

		for (let val of entryDataArray) {
			if (typeof(val.entryData) === "string") {
				yield put(actions.setNewEntryToStore(val.entryData, val.journalKey))
			} else {
				// This for loop runs only for the first two journals("gettingStarted and userGuide") because their entries are logged at once as an array when a user creates a new account.
				for (let el of val.entryData) {
					yield put(actions.setNewEntryToStore(el, val.journalKey))
				}
			}
		}

	} catch (error) {
		// console.log(error.response)
		alert(error.message)
	}
}