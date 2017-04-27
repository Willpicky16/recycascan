import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Form, InputField } from 'react-native-form-generator';
import { postcodeToCouncil } from '../helpers/postcodeToCouncil';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  handleFormChange(data) {
    this.setState({
      postcode: data.postcode
    });
  }
  onButtonPress() {
    postcodeToCouncil(this.state.postcode)
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>ADD NEW PRODUCT:</Text>
        <Form label="Add new product form" ref="form" onChange={this.handleFormChange.bind(this)}>
          <InputField ref="postcode" placeholder="Postcode" helpText="Enter your postcode" />
        </Form>
        <Button title="Submit" onPress={this.onButtonPress.bind(this)} color="#841584" accessibilityLabel="Submit"/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});