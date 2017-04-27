import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { Form, InputField } from 'react-native-form-generator';
// import { postcodeToCouncil } from '../helpers/postcodeToCouncil';
import axios from 'axios';

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
    postcodeToCouncil(this.state.postcode);
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


function postcodeToCouncil (str) {

    if (str.length > 7 || str.length < 5) console.log('Invalid postcode');
    let code;
    // if theres space in the input
    if (str.match(/\s/)) {
        code = str.match(/^\S*/)[0].toUpperCase();
    } else {
    // if theres no space in the input
        code = str.length > 5 ? str.slice(0, 3).toUpperCase() : str.slice(0, 2).toUpperCase();
    }

    axios
    .get('https://vast-eyrie-43528.herokuapp.com/api/postcodes')
    .then(function (res) {
        let value = res.data.postcode.find(key => key.postcode === code).council;
        AsyncStorage.setItem("council", value);
    })
    .catch(function (err) {
        console.log(err);
    });
    
    
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});