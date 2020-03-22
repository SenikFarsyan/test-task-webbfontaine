import React from 'react';
import { shallow } from 'enzyme';

import Speed from './speed.component';

it('it expect to render Speed component', () => {
  expect(shallow(<Speed />)).toMatchSnapshot();
});
