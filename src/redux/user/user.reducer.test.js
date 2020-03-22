import { UserActionTypes } from './user.type';
import userReducer from './user.reducer';

describe('userReducer', () => {
  const initialStateUsers = {
    users: null
  };
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual({
      currentUser: null,
      users: null,
      messages: {}
    });
  });
  it('should return users object', () => {
    expect(
      userReducer(initialStateUsers, {
        type: UserActionTypes.GET_ALL_USERS,
        users: []
      })
    ).toEqual({
      users: []
    });
  });
});
