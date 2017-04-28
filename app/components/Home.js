import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import { Form, InputField } from 'react-native-form-generator';
import { Restart } from 'react-native-restart';
// import { postcodeToCouncil } from '../helpers/postcodeToCouncil';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: '',
      userDetails: {
        council: '',
        council: ''
      }
    }
    this.postcodeToCouncil = this.postcodeToCouncil.bind(this);
  }

  handleFormChange(data) {
    this.setState({
      postcode: data.postcode
    });
  }

  onButtonPress() {
    if (this.state.postcode === '') return alert('Please enter a postcode');
    this.postcodeToCouncil(this.state.postcode);
  }

  onButtonClear() {
    AsyncStorage.clear();
    Restart();
  }

  postcodeToCouncil (str) {
    if (str.length > 7 || str.length < 5) alert('Invalid postcode');
    let code;
    if (str.match(/\s/)) {
      code = str.match(/^\S*/)[0].toUpperCase();
    } else {
      code = str.length > 5 ? str.slice(0, 3).toUpperCase() : str.slice(0, 2).toUpperCase();
    }
    axios
      .get('https://vast-eyrie-43528.herokuapp.com/api/postcodes')
      .then(function (res) {
        let value = {
          council: res.data.postcode.find(key => key.postcode === code).council,
          postcode: str
          };
        AsyncStorage.setItem('userDetails', JSON.stringify(value));
        alert(`Postcode ${str} submitted`);
        Restart();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  componentDidMount () {
    AsyncStorage.getItem('userDetails', (err, result) => {
      let val = JSON.parse(result)
      this.setState({
        userDetails: val
      });
    });
  }

  render () {
    if (this.state.userDetails === null) return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to RecycaScan</Text>
        <Form label="Add new product form" ref="form" onChange={this.handleFormChange.bind(this)}>
          <InputField ref="postcode" placeholder="Postcode" helpText="Enter your postcode" />
        </Form>
        <Button title="Submit" onPress={this.onButtonPress.bind(this)} color="#841584" accessibilityLabel="Submit"/>
      </View>
    )
    return (
      <View style={styles.container}>
        <Text style={styles.userDetailsTitle}>{this.state.userDetails.council} ({this.state.userDetails.postcode})</Text>
        <Button title="Clear" onPress={this.onButtonClear.bind(this)} color="red" accessibilityLabel="Submit"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  userDetailsTitle: {
    fontSize: 30
  },
  title: {
    fontSize: 20,
    color: 'green'
  }
});
