import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PostcodeFormView from './forms/PostcodeForm';

export default class Home extends Component {
  render () {
    return (
      <View style={styles.container}>
        <PostcodeFormView />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
})
