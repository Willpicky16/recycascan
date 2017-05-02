import React, { Component } from "react";
import { StyleSheet, Text, View, AsyncStorage, Image } from "react-native";
import axios from "axios";

const ROOT = 'https://world.openfoodfacts.org/api/v0/product/';
const BINROOT = 'https://vast-eyrie-43528.herokuapp.com/api/bins';

export default class Recycable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      product: {},
      bin: '',
      loading: true
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('userDetails', (err, result) => {
      let val = JSON.parse(result);
      this.setState({
        userDetails: val
      });
    });
    axios
      .get(`${ROOT}/${this.props.navigation.state.params.code}`)
      .then(res => {
        axios
          .get(`${BINROOT}?packaging=${res.data.product.packaging}&council=${this.state.userDetails.council}`)
          .then((res) => {
            this.setState({
              bin: res.data.bins[0].bin,
              loading: false
            })
          })
          .catch((err) => {
            alert(err);
          })
        this.setState({
          product: res.data.product
        });
      })
      .catch(err => {
        console.log(err);
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
        <Text style={styles.title}>{this.state.product.product_name}</Text>
        <View>
          <Image style={styles.binImage} source={{ uri: this.state.bin }}/>
        </View>
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
    fontSize: 30,
    paddingBottom: 20
  },
  loading: {
    color: "red",
    fontSize: 30
  },
  binImage: {
    height: 200,
    width: 130
  }
});
