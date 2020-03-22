import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

//selectors
import { selectUsersScores } from '../../redux/user/user.selectors';

//styles
import classes from './sidebar.module.css';

const HighScores = ({ usersScores }) => {
  if (usersScores) {
    return (
      <div>
        <h3>Top 5 high scores</h3>

        <ol className={classes.scoresList}>
          {usersScores
            .sort((a, b) => {
              return b.score - a.score;
            })
            .slice(0, 5)
            .map(user => {
              return (
                <li key={user.date}>
                  <span>{user.name}</span>
                  <span>{user.score} wpm</span>
                  <span>
                    {moment(new Date(user.date), 'YYYY.MM.DD').fromNow()}
                  </span>
                </li>
              );
            })}
        </ol>
      </div>
    );
  }
  return null;
};

const mapStateToProps = createStructuredSelector({
  usersScores: selectUsersScores
});

export default connect(mapStateToProps)(HighScores);
