import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Calendar extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Calendar</Text>
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
