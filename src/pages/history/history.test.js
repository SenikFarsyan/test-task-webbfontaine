import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import GameHistory from './history.component';

const mockStore = configureStore([]);

describe('connected react-redux GameHistory component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: {
          history: [
            { score: 50, date: '2020/04/21' },
            { score: 30, date: '2020/05/21' }
          ]
        }
      }
    });
    component = renderer.create(
      <Provider store={store}>
        <GameHistory />
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
