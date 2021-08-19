import { createSlice } from '@reduxjs/toolkit';

const addNewJournal = (state, action) => {
	return (
		state.journals[action.payload.journalObjectName] = {
			'journalName': '',
			'description': '',
			'entries': [],
			'event': []
		}
	)
}

const addJournalData = (state, action) => {
	return (
		state.journals[action.payload.journalObjectName].journalName = action.payload.journalName,
		state.journals[action.payload.journalObjectName].description = action.payload.journalDescription
	)
}

const setCurrentJournalKey = (state, action) => {
	return (
		state.journalKey = action.payload.key
	)
}

const setNewEntry = (state, action) => {
	return (
		state.journals[action.payload.currentJournalKey].entries.unshift(action.payload.newEntry)
	)
}

const resetState = (state, action) => {
	return (
		state.userId = "Guest",
		state.journalKey = 'gettingStarted',
		state.journals = {
			gettingStarted: {
				journalName: "Getting started",
				description: "This is welcome journal",
				entries: [
					"Welcome to Journalify",
					"Add new journals and entries to get started",
					"Check the user guide journal to learn how to use Journalify"
				],
				events: [
					"no events yet"
				],
			},
			userGuide: {
				journalName: "User Guide",
				description: "This is a user guide for journalify",
				entries: [
					"Journalify is a digital journal",
					"You can create multiple journals and also add multiple entries to them",
					"Once an entry is add it can not be further edited or deleted."
				],
				event: [
					"No event yet"
				]
			}
		}
	)
}

const journalEntrySlice = createSlice({
	name: 'journalEntry',
	initialState: {
		userId: "Guest",
		journalKey: 'gettingStarted',
		userData: {
			Dob: null,
			email: "guest@guest.com",
			name: "Guest",
			phoneNumber: null
		},
		journals: {
			gettingStarted: {
				journalName: "Getting started",
				description: "This is welcome journal",
				entries: [
					"Welcome to Journalify",
					"Add new journals and entries to get started",
					"Check the user guide journal to learn how to use Journalify"
				],
				events: [
					"no events yet"
				],
			},
			userGuide: {
				journalName: "User Guide",
				description: "This is a user guide for journalify",
				entries: [
					"Journalify is a digital journal",
					"You can create multiple journals and also add multiple entries to them",
					"Once an entry is add it can not be further edited or deleted."
				],
				event: [
					"No event yet"
				]
			}
		}
	},
	reducers: {
		ADD_NEW_JOURNAL: (state, action) => {
			addNewJournal(state, action)
		},
		ADD_JOURNAL_DATA_TO_STORE: (state, action) => {
			addJournalData(state, action)
		},
		SET_CURRENT_JOURNAL_KEY_TO_STORE: (state, action) => {
			setCurrentJournalKey(state, action)
		},
		SET_NEW_ENTRY_TO_STORE: (state, action) => {
			setNewEntry(state, action)
		},
		RESET_STATE: (state, action) => {
			resetState(state, action)
		}
	}
})

export const {
	LOG_INITIAL_DATA,
	ADD_NEW_JOURNAL,
	ADD_JOURNAL_DATA_TO_STORE,
	SET_CURRENT_JOURNAL_KEY_TO_STORE,
	SET_NEW_ENTRY_TO_STORE,
	RESET_STATE
} = journalEntrySlice.actions

export default journalEntrySlice.reducer;