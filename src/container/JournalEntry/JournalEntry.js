import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Icon, makeStyles, Paper, Typography, useMediaQuery } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';

import Header from '../../component/UI/MaterialUIComponent/Header/Header';
import ResponsiveDrawer from '../../component/UI/MaterialUIComponent/SideDrawer/SideDrawer';
import SimpleContainer from '../../component/UI/MaterialUIComponent/Container/Container';

import * as actions from '../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  journalPaper: {
    width: 'border-box',
    textAlign: 'left',
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'left'
  },
  entryElement: {
    padding: 5,
  }
}))

const JournalEntry = () => {
  const classes = useStyles();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNewEntryField, setShowNewEntryField] = useState(false)
  const [newEntry, setNewEntry] = useState()

  const currentJournalKey = useSelector(state => state.journalEntry.journalKey)
  const journalEntryArray = useSelector(state => state.journalEntry.journals[currentJournalKey].entries)
  const currentToken = useSelector(state => state.auth.token)
	const currentUserId = useSelector(state => state.auth.userId)

  const dispatch = useDispatch()

  const logNewEntryToStoreAction = (newEntry, currentJournalKey) => dispatch(actions.setNewEntryToStore(newEntry, currentJournalKey))
  const postNewEntryToFirebseAction = (newEntry, currentJournalKey, currentUserId, currentToken) => dispatch(actions.postNewEntryToFirebse(newEntry, currentJournalKey, currentUserId, currentToken))

  //Handles the alignment of the journals entries when screen size changes
  let journalPaperLeftMargin = 240
  const matches = useMediaQuery('(min-width:600px)')

  useEffect(() => {
    //...
  }, [journalPaperLeftMargin, matches])
  
  //Handles the toggle of the sideDrawer
	const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
	};
  
  // assigns the value for the left margin of the journal entries container when the screen size becomes less then 600px, i.e, when the sideDrawer is hidden.
  if(!matches) {
    journalPaperLeftMargin = 0
  }

  // This displays the journal entries
  const displayJournalDetails = (
    journalEntryArray.map(el => {
      return (
        <Paper style={{marginLeft: journalPaperLeftMargin}} className={classes.journalPaper}>
          <Typography className={classes.entryElement}>
            {el}
          </Typography>
        </Paper>
      )
    })
  )

  // Handles the logging of new entry to store and firebse.
  const logNewEntryToStore = (event) => {
    event.preventDefault()
    setShowNewEntryField(!showNewEntryField)
    logNewEntryToStoreAction(newEntry, currentJournalKey)
    postNewEntryToFirebseAction(newEntry, currentJournalKey, currentUserId, currentToken)
  }

  // New entry form
  let newEntryFeild = null
  if (showNewEntryField) {
    newEntryFeild = (
      <form style={{marginLeft: journalPaperLeftMargin}} className={classes.journalPaper} onSubmit={(event) => logNewEntryToStore(event)}>
        <TextField fullWidth id="outlined-basic" label="New entry" variant="outlined" helperText="Add new entry" onChange={(event) => setNewEntry(event.target.value)}/>
        <Button
					variant="contained"
					color="primary"
					size="large"
					className={classes.button}
					startIcon={<SaveIcon />}
					type="Submit"
				>
					Save
				</Button>
      </form>
    )
  }

  //component to add new entry to the journal
  const addNewEntry = (
    <div className={classes.button}>
      <Button
        onClick={() => setShowNewEntryField(!showNewEntryField)}
        style={{marginLeft: journalPaperLeftMargin}}
        variant="contained"
        color="primary"
        startIcon={<Icon color="secondary">add_circle</Icon>}
      >
        Add new entry
      </Button>
    </div>
  )

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle}/>
        <SimpleContainer>
          <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        </SimpleContainer>
        <SimpleContainer>
          {addNewEntry}
          {newEntryFeild}
          {displayJournalDetails}
        </SimpleContainer>
    </>
  )
}

export default JournalEntry;