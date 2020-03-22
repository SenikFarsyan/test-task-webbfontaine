import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import SignInAndSignUpPage from './sign-in-and-sign-up.component';

const mockStore = configureStore([]);

describe('connected react-redux SignInAndSignUpPage component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        messages: {}
      }
    });
    component = renderer.create(
      <Provider store={store}>
        <SignInAndSignUpPage />
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
