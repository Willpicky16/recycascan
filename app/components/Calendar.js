import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      detailsRecieved: false
    }
  }

  componentDidMount() {
        AsyncStorage.getItem('userDetails', (err, result) => {
          let val = JSON.parse(result)
          this.setState({
            userDetails: val,
            detailsRecieved: true
          });
        });
    }

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
