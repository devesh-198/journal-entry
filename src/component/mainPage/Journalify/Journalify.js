import React from 'react';

import classes from './Journalify.module.css';

import Auth from '../../../container/Auth/Auth';
import Footer from '../../footer/footer';

const Journalify = () => {

  //used to scroll to signin or signup form in ('../../../container/Auth/Auth') 
  const scrollTo = (scrollToType) => {
    document.querySelector(`#${scrollToType}`).scrollIntoView()
  }

  //used to artificially click the google login button in ('../../../container/Auth/Auth')
  const clickGoogleLogin = () => {
    document.querySelector("#googleLogin").click()
  }

  return (
    <>
      <div className={classes.mainpage_layout}>
        <div className={classes.heading}>
          <h1>Journalify</h1>
          <h3>Create your own Journal</h3>
        </div>
        <div className={classes.auth_block}>
          <div className={classes.auth_inner_block}>
            <button onClick={() => scrollTo("signIn")} >SignIn</button>
            <button onClick={() => scrollTo("signUp")} >SignUp</button>
          </div>
          <button onClick={clickGoogleLogin}>Continue with Google</button>
        </div>
      </div>
      <Auth />
      <Footer/>
    </>
  )
}

export default Journalify;