import React, { useState } from 'react';

import Header from '../JournalEntryComponent/Header/Header';
import ResponsiveDrawer from '../JournalEntryComponent/SideDrawer/SideDrawer';

const JournalEntry = () => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle}/>
      <ResponsiveDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
      <p>this is working.</p>
    </>
  )
}

export default JournalEntry;