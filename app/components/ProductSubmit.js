import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Form, InputField, LinkField } from 'react-native-form-generator';
import axios from 'axios';

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
        alert(`Product ${this.state.product_name} (${this.props.navigation.state.params.code}) sent`);
      })
      .catch(err => {
        alert('Product could not be submitted, please try again!')
      });
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>ADD NEW PRODUCT:</Text>
        <Form label="Add new product form" ref="form" onChange={this.handleFormChange.bind(this)}>
          <InputField ref="product_name" placeholder="Product Name" helpText="Enter product name" />
          <InputField ref="packaging" placeholder="Product Packaging" helpText="Enter product packaging" />
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
