import { UserActionTypes } from './user.type';
import * as actions from './user.actions';

describe('user actions', () => {
  it('it should create an action to signout user', () => {
    const expectedAction = {
      type: UserActionTypes.SIGN_OUT_SUCCESS
    };
    expect(actions.signOut()).toEqual(expectedAction);
  });
});
