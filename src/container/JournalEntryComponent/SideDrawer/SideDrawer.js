import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Toolbar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import SimpleAccordion from '../Accordion/Accordion';

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
}));

const ResponsiveDrawer = (props) => {
	const classes = useStyles();
	const theme = useTheme();

	const journal = useSelector(state => state.journalEntry.journals)

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				{Object.entries(journal).map(([key, value]) => (
					<ListItem button key={key}>
							<SimpleAccordion key={key} journalName={value.journalName} description={value.description}/>
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<nav className={classes.drawer} aria-label="mailbox folders">
				<Hidden smUp implementation="css">
					<Drawer
						// container={container}
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
							<Typography color="secondary">
								Journal
							</Typography>
						</Toolbar>
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
						</Toolbar>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

export default ResponsiveDrawer;
