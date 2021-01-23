import { createSlice } from '@reduxjs/toolkit';

const journalEntrySlice = createSlice({
	name: 'journalEntry',
	initialState: {
		userId: "Guest",
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
				getStarted: {
					entryDate: null,
					entryName: "get started",
					entries: [
						"Welcome to Journalify",
						"Add new journals and entries to get started",
						"Check the user guide journal to learn how to use journalify"
					],
					events: [
						"no events yet"
					],
				}
			},
			userGuide: {
				journalName: "User Guide",
				description: "This is a user guide for journalify",
				userGuide: {
					entryDate: null,
					entryName: "User guide ",
					entries: [
						"Journalify is a digital journal",
						"You can create multiple journals and also add multiple entries to them",
						"Every entry is added to the entries of the current date.",
						"Once an entry is add it can not be further edited or deleted."
					],
					event: [
						"No event yet"
					]
				}
			}
		}
	},
	reducers: {

	}
})

export default journalEntrySlice.reducer;