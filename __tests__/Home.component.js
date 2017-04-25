import 'react-native';
import React from 'react';

import Home from '../app/components/Home';

import renderer from 'react-test-renderer';

test('home page renders correctly', () => {
  const tree = renderer.create(
    <Home />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
