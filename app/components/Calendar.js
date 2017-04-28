import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
        AsyncStorage.getItem("council").then((value) => {
            this.setState({council: value});
        }).done();
    }

  render () {
    return (
      <View style={styles.container}>
        <Text>Calendar</Text>
        <Text>{this.state.council}</Text>
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
