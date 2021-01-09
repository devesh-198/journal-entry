import {takeEvery, all, takeLatest} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import { logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga, 
    authCheckStateSaga, 
} from './auth';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}