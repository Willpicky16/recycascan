import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableNativeFeedback, Image } from 'react-native';
import { Form, InputField, LinkField } from 'react-native-form-generator';
import axios from 'axios';
import { Restart } from 'react-native-restart';

const ROOT = 'https://world.openfoodfacts.org/api/v0/product/';
const POSTROOT = 'https://world.openfoodfacts.org/cgi/product_jqm2.pl';

export default class ProductSubmit extends Component {
  constructor (props) {
    super (props)
    this.state = {
      product_name: '',
      packaging: ''
    }
  }
  handleFormChange (data) {
    this.setState({
      product_name: data.product_name,
      packaging: data.packaging
    })
  }
  onButtonPress () {
    axios
      .get(`${POSTROOT}?code=${this.props.navigation.state.params.code}&product_name=${this.state.product_name}&packaging=${this.state.packaging}`)
      .then(res => {
        alert(`Product ${this.state.product_name} (${this.props.navigation.state.params.code}) added to database`);
        Restart();
      })
      .catch(err => {
        alert('Product could not be submitted, please try again!');
      });
  }
  render () {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/recycascan.png')}/>
        <Text style={styles.mainTitle} >Product not found!</Text>
        <Text style={styles.title} >Please add product to our database:</Text>
        <Form label="Add new product form" ref="form" onChange={this.handleFormChange.bind(this)}>
          <InputField ref="product_name" placeholder="Product Name" helpText="                                     " />
          <InputField ref="packaging" placeholder="Product Packaging" helpText="                                     " />
        </Form>
        <TouchableNativeFeedback
            onPress={this.onButtonPress.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}
            accessibilityLabel="Submit">
          <View style={styles.button} >
            <Text style={styles.buttonText}>ADD PRODUCT</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ddf4c5'
  },
  title: {
    fontSize: 20,
    color: '#004400',
    marginBottom: 40
  },
  mainTitle: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: 20,
    color: '#004400',
    fontWeight: 'bold'
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
  },
  logo: {
    marginBottom: 20,
    width: 100,
    height: 50
  }
});
