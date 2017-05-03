import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage, Image, Vibration, TouchableNativeFeedback } from 'react-native';
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
        postcode: ''
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
    Vibration.vibrate();
  }

  onButtonClear() {
    AsyncStorage.clear();
    Vibration.vibrate();
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
          postcode: str.toUpperCase()
          };
        AsyncStorage.setItem('userDetails', JSON.stringify(value));
        // alert(`Postcode ${str} submitted`);
        Restart();
      })
      .catch(function (err) {
        alert(err);
      });
  }
  watchID: ?number = null;

  componentDidMount () {
    AsyncStorage.getItem('userDetails', (err, result) => {
      let val = JSON.parse(result)
      this.setState({
        userDetails: val
      });
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => console.log(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      console.log(position)
    });
  }

  render () {
    if (this.state.userDetails === null) return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/recycascan.png')}/>
        <Text style={styles.title}>Enter your postcode to begin</Text>
        <Form label="Add new product form" ref="form" onChange={this.handleFormChange.bind(this)}>
          <InputField ref="postcode" placeholder="Postcode" helpText="                           "/>
        </Form>
        <TouchableNativeFeedback
            onPress={this.onButtonPress.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}
            accessibilityLabel="Submit">
          <View style={styles.button} >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/recycascan.png')}/>
        <Text style={styles.title}> My postcode</Text>
        <Text style={styles.postcode}>{this.state.userDetails.postcode}</Text>
        <TouchableNativeFeedback
            onPress={this.onButtonClear.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}
            accessibilityLabel="Edit">
          <View style={styles.button} >
            <Text style={styles.buttonText}>EDIT</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

// {this.state.userDetails.council}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#A3D860'
  },
  userDetailsTitle: {
    paddingBottom: 20,
    fontSize: 20,
    color: '#004400'
  },
  postcode: {
    paddingBottom: 40,
    fontSize: 50,
    color: '#004400',
    fontWeight: '300'
  },
  title: {
    paddingTop: 60,
    paddingBottom: 10,
    fontSize: 20,
    color: '#004400'
  },
  logo: {
    width: 200,
    height: 100
  },
  button: { 
    height: 40,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#004400'
  },
  buttonText: {
    color: '#fff', 
    padding: 10, 
    textAlign: "center"
  }
});