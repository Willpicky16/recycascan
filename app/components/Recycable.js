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
          <Image source={require('../images/loading.gif')} style={{width: 100, height: 50 }}/>
          
        </View>
      );
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../images/recycascan.png')}/>
        <Text style={styles.recycle}>{this.state.product.product_name}</Text>
        <Text style={styles.title}>Gets recycled here</Text>
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
    alignItems: "center",
    backgroundColor: '#ddf4c5'
  },
  title: {
    marginBottom: 30,
    fontSize: 20,
    color: '#004400',
  },
  loading: {
    color: "red",
    fontSize: 30
  },
  binImage: {
    height: 300,
    width: 195
  },
  logo: {
    marginBottom: 20,
    width: 100,
    height: 50
  },
  recycle: {
    fontSize: 20,
    color: '#004400',
    fontWeight: 'bold'
  }
});
