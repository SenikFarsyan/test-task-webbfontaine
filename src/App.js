import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, Redirect } from 'react-router-dom';

//actions
import { getAllUsers, checUserSession } from './redux/user/user.actions';

//selectors
import { selectCurrentUser } from './redux/user/user.selectors';

//components
import Header from './components/header/header.component';

//pages
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import GameHistory from './pages/history/history.component';

function App({ getAllUsers, currentUser, checUserSession }) {
  useEffect(() => {
    getAllUsers();
    checUserSession();
  }, [checUserSession, getAllUsers]);
  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path='/'
          render={() =>
            !currentUser ? <Redirect to='/signin' /> : <HomePage />
          }
        />
        <Route
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
          }
        />
        <Route
          path='/history'
          render={() =>
            !currentUser ? <Redirect to='/signin' /> : <GameHistory />
          }
        />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = { getAllUsers, checUserSession };

export default connect(mapStateToProps, mapDispatchToProps)(App);
