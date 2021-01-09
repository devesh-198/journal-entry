import React, { Suspense, useCallback, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './App.css';
import journalify from './component/mainPage/Journalify/Journalify';
import JournalEntry from './container/JournalEntry/JournalEntry';
import logout from './component/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './component/UI/Spinner/Spinner';


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
