import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Calendar from '../app/components/Calendar';

test('calendar page renders correctly', () => {
  const tree = renderer.create(
    <Calendar />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
