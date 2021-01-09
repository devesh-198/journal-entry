import React from 'react';

import developerInfo from '../DevelopersInfo/DevelopersInfo';
import Auth from '../../../container/Auth/Auth';

const Journalify = () => {

  const mainScreen = (
    <React.Fragment>
      <div>
        <h1>Journalify</h1>
        <h3>Create your own Journal</h3>
        <button>Log in</button>
        <button>Sign up</button>
        <br></br>
        <button title='Your data entered will not be saved'>try as a guest</button>
      </div>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {mainScreen}
      <Auth/>
      {developerInfo}
    </React.Fragment>
  )
}

export default Journalify;