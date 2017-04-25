import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Barcode from '../app/components/Barcode';

test('barcode page renders correctly', () => {
  const tree = renderer.create(
    <Barcode />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
