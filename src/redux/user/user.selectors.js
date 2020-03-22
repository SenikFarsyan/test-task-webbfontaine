import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUsersScores = createSelector([selectUser], user => {
  let scores = [];
  if (user.users) {
    user.users.forEach(_user => {
      _user.history.forEach(score => {
        scores.push({ name: _user.name, score: score.score, date: score.date });
      });
    });
  }

  return scores;
});

export const selectUserHistory = createSelector([selectUser], user =>
  user.currentUser ? user.currentUser.history : []
);

export const selectMessages = createSelector(
  [selectUser],
  user => user.messages
);
