import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Form, PickerField } from 'react-native-form-generator';

import postcodes from './data/postcodes';

export default class PostcodeFormView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      postcode: ''
    }
  }
  handleChange (formData){
    this.setState({
      postcode: formData
    })
  }
  onButtonPress () {
    this.setState({
      postcode: ''
    })
  }
  render () {
    if (this.state.postcode.length >= 1) return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.subtitle}>{this.state.postcode}</Text>
          <Button title="Edit" onPress={this.onButtonPress.bind(this)} color="#841584" accessibilityLabel="Submit"/>
        </View>
      </View>
    )
    return (
      <View>
        <Text style={styles.title}>Welcome to RecycaScan!</Text>
        <View style={styles.container}>
          <Form ref="postcodeForm" label="hello">
            <PickerField ref="postcode" label="Please enter your postcode:" onValueChange={this.handleChange.bind(this)} options={postcodes}/>
          </Form>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    fontSize: 20
  },
  container: {
    flex: 1
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    fontSize: 100,
    color: 'red'
  }
})
