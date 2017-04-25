import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Map from '../app/components/Map';

test('map page renders correctly', () => {
  const tree = renderer.create(
    <Map />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
