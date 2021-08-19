import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { 
	makeStyles, 
	useTheme, 
	Button, 
	TextField, 
	Toolbar, 
	Typography, 
	Icon, 
	ListItem, 
	List, 
	Hidden, 
	Drawer, 
	Divider, 
	CssBaseline, 
	IconButton
} from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import SimpleAccordion from '../Accordion/Accordion';

import * as actions from '../../../../store/actions/index';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
	addIcon: {
		fontSize: '35px',
		cursor: 'pointer',
		width: 'fit-content'
	},
	button: {
    margin: theme.spacing(1),
  },
	menuButton: {
		marginLeft: '100px',
		marginRight: theme.spacing(1),
	},
}));

const ResponsiveDrawer = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	const [newJournalAddition, setNewJournalAddition] = useState(false)

	const journal = useSelector(state => state.journalEntry.journals)
	const currentToken = useSelector(state => state.auth.token)
	const currentUserId = useSelector(state => state.auth.userId)

	const dispatch = useDispatch()

	const logJournalToStoreAction = (journalObjectName) => dispatch(actions.addNewJournalToStore(journalObjectName))
	const logJournalDataToStoreAction = (journalObjectName, journalName, journalDescription) => dispatch(actions.addJournalDataToStore(journalObjectName, journalName, journalDescription))
	const setCurrentJournalKeyAction = (key) => dispatch(actions.setCurrentJournalKeyToStore(key))
	const updateJournalDataToFirebaseAction = (journalName, journalDescription, journalKey, userId, currentToken) => dispatch(actions.updateJournalDataToFirebase(journalName, journalDescription, journalKey, userId, currentToken))

	const [journalName, setJournalName] = useState()
	const [journalDescription, setJournalDescription] = useState()

	useEffect(() => {

	}, [newJournalAddition])

	const setCurrentJournalKeyClicked = (journalKey) => {
		setCurrentJournalKeyAction(journalKey)
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{Object.entries(journal).map(([journalKey, value]) => {
					return (
						<ListItem button key={journalKey} onClick={(event) => setCurrentJournalKeyClicked(journalKey)}>
							<SimpleAccordion
								key={journalKey}
								journalName={value.journalName}
								description={value.description}
							/>
						</ListItem>
					)
				})}
			</List>
		</div>
	);

	const logNewJournalToStore = (event) => {
		event.preventDefault()
		setNewJournalAddition(!newJournalAddition)

		const journalKey = Object.keys(journal).length

		logJournalToStoreAction(`journal${journalKey}`)
		logJournalDataToStoreAction(`journal${journalKey}`, journalName ,journalDescription)
		updateJournalDataToFirebaseAction(journalName, journalDescription , `journal${journalKey}`, currentUserId, currentToken)
	}

	let newJournalForm = null;

	if (newJournalAddition) {
		newJournalForm = (
			<form onSubmit={(event) => logNewJournalToStore(event)}>
				<TextField id="outlined-basic" label="Journal Name" variant="outlined" helperText="Name your journal" onChange={(event) => setJournalName(event.target.value)}/>
				<TextField id="outlined-basic" label="Journal Description" variant="outlined" helperText="Describe your journal" onChange={(event) => setJournalDescription(event.target.value)}/>
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

	const toggleNewJournalAddition = () => {
		setNewJournalAddition(!newJournalAddition)
	}

	const addJournalIcon = (
		<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleNewJournalAddition}>
			<Icon className={classes.addIcon} color="secondary">add_circle</Icon>
		</IconButton>
	)

	return (
		<div className={classes.root}>
			<CssBaseline />
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						variant="temporary"
						anchor={theme.direction === 'rtl' ? 'right' : 'left'}
						open={props.mobileOpen}
						onClose={props.handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						<Toolbar>
							<Typography color="primary">
								Journal
							</Typography>
							{addJournalIcon}
						</Toolbar>
						{newJournalForm}
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						<Toolbar>
							<Typography color="primary">
								Journal
							</Typography>
							{addJournalIcon}
						</Toolbar>
						{newJournalForm}
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

export default ResponsiveDrawer;
