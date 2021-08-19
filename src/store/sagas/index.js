import {takeEvery, all} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';

import { 
    logoutSaga, 
    checkAuthTimeoutSaga, 
    authUserSaga, 
    authCheckStateSaga, 
    loadInitialDataSaga,
} from './auth';

import {
    postInitialDataSaga,
    updateJournalDataToFirebaseSaga,
    postNewEntryToFirebaseSaga
} from './journalEntry';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_INITITATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.LOAD_INITIAL_DATA, loadInitialDataSaga),
        takeEvery(actionTypes.POST_INITIAL_DATA_ON_SIGNUP, postInitialDataSaga),
        takeEvery(actionTypes.UPDATE_JOURNAL_DATA_TO_FIREBASE, updateJournalDataToFirebaseSaga),
        takeEvery(actionTypes.POST_NEW_ENTRY_TO_FIREBASE, postNewEntryToFirebaseSaga)
    ])
}