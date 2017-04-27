import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

const ROOT = "https://world.openfoodfacts.org/api/v0/product/";

export default class Recycable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true
    };
  }
  componentDidMount() {
    axios
      .get(`${ROOT}/${this.props.navigation.state.params.code}`)
      .then(res => {
        this.setState({
          product: res.data.product,
          loading: false
        });
      })
      .catch(err => {
        this.props.navigation.navigate('ProductSubmit', {code: this.props.navigation.state.params.code});
      });
  }
  render() {
    if (this.state.loading === true)
      return (
        <View style={styles.container}>
          <Text style={styles.loading}>loading....</Text>
        </View>
      );
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.state.product.product_name} ({this.state.product.code})
        </Text>
        <Text style={styles.subtitle}>
          Packaging: {this.state.product.packaging}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "blue",
    fontSize: 25
  },
  subtitle: {
    fontSize: 20
  },
  loading: {
    color: "red",
    fontSize: 30
  }
});
