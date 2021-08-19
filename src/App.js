import React, { Suspense, useCallback, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import firebase from 'firebase';

import './App.css';
import journalify from './component/mainPage/Journalify/Journalify';
import JournalEntry from './container/JournalEntry/JournalEntry';
import logout from './component/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './component/UI/Spinner/Spinner';

// initializing firebaseConfig object with "DOMContentLoaded" for it to excute after the HTML is loaded.
document.addEventListener("DOMContentLoaded", event => {
  var firebaseConfig = {
    apiKey: "AIzaSyBV9i4-4qlOjhVGoVOx4eg7THddYGbsuCs",
    authDomain: "journalify-962fa.firebaseapp.com",
    databaseURL: "https://journalify-962fa-default-rtdb.firebaseio.com",
    projectId: "journalify-962fa",
    storageBucket: "journalify-962fa.appspot.com",
    messagingSenderId: "235792283970",
    appId: "1:235792283970:web:5fec1dae0f547375b8f0db",
    measurementId: "G-C0NEG18JLW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
})

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.token !== null)

  const dispatch = useDispatch()

  const onTryAutoSignup = useCallback(() => dispatch(actions.authCheckState()), [dispatch])

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/" exact component={journalify}/>
      <Redirect to="/"/>
    </Switch>
  )

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={journalify} />
        <Route path="/logout" component={logout}/>
        <Route path="/journal-entry" render={() => <JournalEntry />}/>
        <Redirect to="/"/>
      </Switch>
    )
  }
  
  return (
    <div className="App">
      <Suspense fallback={<Spinner/>}>
        {routes}
      </Suspense>
    </div>
  )
}

export default withRouter(App);
