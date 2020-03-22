import { UserActionTypes } from './user.type';

//config
import { api } from '../../config/index';

export const getAllUsers = () => {
  return (dispatch, getState) => {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: UserActionTypes.GET_ALL_USERS,
          users: data
        });
      })
      .catch(err => console.log(err));
  };
};

export const registerUser = newUser => {
  return (dispatch, getState) => {
    const state = getState();
    let err = '';
    if (!state.user.users) {
      return dispatch({
        type: UserActionTypes.SIGN_IN_FAILURE,
        error: 'Something went wrong try again later'
      });
    }
    state.user.users.forEach(user => {
      if (user.name === newUser.name) {
        err = 'The name is already in use!';
      }
    });

    if (err) {
      dispatch({
        type: UserActionTypes.SIGN_UP_FAILURE,
        error: err
      });
      return;
    }
    const users = [...state.user.users, newUser];

    fetch(api, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(users)
    })
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: UserActionTypes.SIGN_UP_SUCCESS,
          users
        });
      })
      .catch(err => console.log(err));
  };
};

export const saveUserScore = user => {
  return (dispatch, getState) => {
    const state = getState();
    const users = state.user.users;
    let userIndex;
    users.forEach((_user, i) => {
      if (_user.name === user.name) {
        userIndex = i;
      }
    });
    users[userIndex].history = user.history;
    fetch(api, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(users)
    })
      .then(res => res.json())
      .then(() => {
        dispatch({
          type: UserActionTypes.SAVE_USER_SCORE,
          users
        });
      })
      .catch(err => console.log(err));
  };
};

export const signinUser = user => {
  return (dispatch, getState) => {
    const state = getState();
    let userData = null;
    if (!state.user.users) {
      return dispatch({
        type: UserActionTypes.SIGN_IN_FAILURE,
        error: 'Something went wrong try again later'
      });
    }
    state.user.users.forEach(_user => {
      if (_user.name === user.name && _user.password === user.password) {
        userData = _user;
      }
    });
    if (userData) {
      sessionStorage.setItem('user', JSON.stringify(userData));
      return dispatch({
        type: UserActionTypes.SIGN_IN_SUCCESS,
        user: userData
      });
    }
    return dispatch({
      type: UserActionTypes.SIGN_IN_FAILURE,
      error: 'User is not found'
    });
  };
};

export const signOut = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const checUserSession = () => {
  return {
    type: UserActionTypes.CHECK_USER_SESSION
  };
};
