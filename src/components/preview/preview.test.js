import React from 'react';
import { shallow } from 'enzyme';
import TextSample from './preview.component';

it('expect to render TextSample component', () => {
  const text = 'test';
  const userInput = 'T';
  expect(
    shallow(<TextSample text={text} userInput={userInput} />)
  ).toMatchSnapshot();
});
