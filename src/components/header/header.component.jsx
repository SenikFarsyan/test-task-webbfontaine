import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

//selectors
import { selectCurrentUser } from '../../redux/user/user.selectors';

//actions
import { signOut } from '../../redux/user/user.actions';

//icons
import { ReactComponent as Logo } from '../../assets/WPM.svg';

//styles
import classes from './header.module.css';

const Header = ({ currentUser, signOut }) => {
  return (
    <div className={classes.headerContainer}>
      <Link className={classes.logoContainer} to='/'>
        <Logo />
      </Link>
      <div className={classes.optionsContainer}>
        {currentUser ? (
          <React.Fragment>
            <Link className={classes.optionLink} to='/history'>
              History
            </Link>
            <div className={classes.optionLink} onClick={signOut}>
              Sign Out
            </div>
          </React.Fragment>
        ) : (
          <Link className={classes.optionLink} to='signin'>
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = { signOut };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
