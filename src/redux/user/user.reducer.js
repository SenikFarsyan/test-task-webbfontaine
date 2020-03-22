import { UserActionTypes } from './user.type';

const INITIAL_STATE = {
  currentUser: null,
  users: null,
  messages: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GET_ALL_USERS:
      return {
        ...state,
        users: action.users
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        users: action.users,
        messages: {
          error: null,
          success: 'Successfully signed up, now you can log in'
        }
      };
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        messages: { error: action.error, success: null }
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        messages: {}
      };
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        messages: { error: action.error, success: null }
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      sessionStorage.removeItem('user');
      return {
        ...state,
        currentUser: null
      };
    case UserActionTypes.CHECK_USER_SESSION:
      let user = null;
      if (sessionStorage.user) {
        user = JSON.parse(sessionStorage.user);
      } else {
        user = null;
      }
      return {
        ...state,
        currentUser: user
      };
    case UserActionTypes.SAVE_USER_SCORE:
      return {
        ...state,
        users: action.users
      };
    default:
      return state;
  }
};

export default userReducer;
