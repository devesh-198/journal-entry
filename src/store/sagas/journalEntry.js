import instance from '../../axios-authenticated';
import { all } from 'redux-saga/effects';

export function* postInitialDataSaga(action) {

	const postDataQueryParama = '?auth=' + action.currentToken;

	try {
		const postData = Object.entries(action.journalData).map(([journalKey, value]) => {

			// This is posted in the "/journals". 
			const postJournalData = {
				journalKey: journalKey,
				journalName: value.journalName,
				journalDescription: value.description,
				userId: action.userId
			}

			// This is posted in "/entries".
			const postEntriesData = {
				journalKey: journalKey,
				userId: action.userId,
				entryData: value.entries
			}

			return ([postJournalData, postEntriesData])
		})

		yield all([
			instance.post('/journal.json' + postDataQueryParama, postData[0][0]),
			instance.post('/entries.json' + postDataQueryParama, postData[0][1]),
			instance.post('/journal.json' + postDataQueryParama, postData[1][0]),
			instance.post('/entries.json' + postDataQueryParama, postData[1][1]),
		])
		
	} catch (error) {
		// console.log(error.response)
		alert(error.message)
	}
}

export function* updateJournalDataToFirebaseSaga(action) {

	const postDataQueryParama = '?auth=' + action.currentToken;

	// This is posted in the "/journals". 
	const postJournalDataObject = {
		journalKey: action.journalKey,
		journalName: action.journalName,
		journalDescription: action.journalDescription,
		userId: action.userId
	} 

	try {
		yield instance.post('/journal.json' + postDataQueryParama, postJournalDataObject)
	}catch (error) {
		// console.log(error.response)
		alert(error.message)
	}
}

export function* postNewEntryToFirebaseSaga(action) {
	const postDataQueryParama = '?auth=' + action.currentToken;

	// This is posted in "/entries".
	const postEntryDataObject = {
		entryData: action.newEntry,
		journalKey: action.currentJournalKey,
		userId: action.currentUserId
	}

	try {
		yield instance.post('/entries.json' + postDataQueryParama, postEntryDataObject)
	}catch (error) {
		// console.log(error.response)
		alert(error.message)
	}
}