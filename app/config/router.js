import React, { Component } from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Home from '../components/Home';
import Barcode from '../components/Barcode';
import Calendar from '../components/Calendar';
import Map from '../components/Map';
import Recycable from '../components/Recycable';

export const BarcodeStack = StackNavigator({
  Barcode: {
    screen: Barcode,
  },
  Recycable: {
    screen: Recycable,
    path: 'recycable/:code'
  }
})

export const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home'
    }
  },
  Barcode: {
    screen: BarcodeStack,
    navigationOptions: {
      tabBarLabel: 'Barcode'
    }
  },
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      tabBarLabel: 'Cal'
    }
  },
  Maps: {
    screen: Map,
    navigationOptions: {
      tabBarLabel: 'Map'
    }
  }
})
