import * as actionTypes from './actionTypes';

import {
    ADD_NEW_JOURNAL,
    ADD_JOURNAL_DATA_TO_STORE,
    SET_CURRENT_JOURNAL_KEY_TO_STORE,
    SET_NEW_ENTRY_TO_STORE,
    RESET_STATE
}from '../reducers/journalEntry';

export const addNewJournalToStore = (journalObjectName) => {
    return ADD_NEW_JOURNAL({
        journalObjectName: journalObjectName
    })
}

export const addJournalDataToStore = (journalObjectName, journalName, journalDescription) => {
    return ADD_JOURNAL_DATA_TO_STORE({
        journalObjectName: journalObjectName,
        journalName: journalName,
        journalDescription: journalDescription
    })
}

export const setCurrentJournalKeyToStore = (journalKey) => {
    return SET_CURRENT_JOURNAL_KEY_TO_STORE({
        key: journalKey
    })
}

export const setNewEntryToStore = (newEntry, currentJournalKey) => {
    return SET_NEW_ENTRY_TO_STORE({
        newEntry: newEntry,
        currentJournalKey: currentJournalKey
    })
} 

export const updateJournalDataToFirebase = (journalName, journalDescription, journalKey, userId, currentToken) => {
    return {
        type: actionTypes.UPDATE_JOURNAL_DATA_TO_FIREBASE,
        journalName: journalName,
        journalDescription: journalDescription,
        journalKey: journalKey,
        userId: userId,
        currentToken: currentToken
    }
}

export const postNewEntryToFirebse = (newEntry, currentJournalKey, currentUserId, currentToken) => {
    return {
        type: actionTypes.POST_NEW_ENTRY_TO_FIREBASE,
        newEntry: newEntry,
        currentJournalKey: currentJournalKey,
        currentUserId: currentUserId,
        currentToken: currentToken
    }
}

export const resetState = () => {
    return RESET_STATE()
}