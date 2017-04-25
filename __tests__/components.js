import 'react-native';
import React from 'react';

import Home from '../app/components/Home';
import Barcode from '../app/components/Barcode';
import Calendar from '../app/components/Calendar';
import Map from '../app/components/Map';
import Recycable from '../app/components/Recycable';

import renderer from 'react-test-renderer';

test('home page renders correctly', () => {
  const tree = renderer.create(
    <Home />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('barcode page renders correctly', () => {
  const tree = renderer.create(
    <Barcode />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('calendar page renders correctly', () => {
  const tree = renderer.create(
    <Calendar />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('map page renders correctly', () => {
  const tree = renderer.create(
    <Map />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('recycable page renders correctly', () => {
  const tree = renderer.create(
    <Recycable />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
