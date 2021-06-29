import React, { useState } from 'react';

import Header from '../../component/UI/MaterialUIComponent/Header/Header';
import ResponsiveDrawer from '../../component/UI/MaterialUIComponent/SideDrawer/SideDrawer';

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