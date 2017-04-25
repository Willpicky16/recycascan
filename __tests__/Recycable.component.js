import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Recycable from '../app/components/Recycable';

test('recycable page renders correctly', () => {
  const tree = renderer.create(
    <Recycable />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
