import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

//selectors
import { selectUserHistory } from '../../redux/user/user.selectors';

//styles
import classes from './history.module.css';

const GameHistory = ({ userHistory }) => {
  return userHistory.length > 1 ? (
    <div className={classes.container}>
      <h3>Here are your scores</h3>
      <ol className={classes.historyList}>
        {userHistory
          .sort((a, b) => b.score - a.score)
          .map(game => (
            <li key={game.date}>
              <span>{game.score} wpm</span>{' '}
              <span>{moment(new Date(game.date), 'YYYY.MM.DD').fromNow()}</span>
            </li>
          ))}
      </ol>
    </div>
  ) : (
    <div className={classes.container}>
      <p>You have not played yet</p>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userHistory: selectUserHistory
});

export default connect(mapStateToProps)(GameHistory);
