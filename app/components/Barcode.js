import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Vibration, AsyncStorage, Image } from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import _ from 'underscore';

// const ROOT = 'https://gentle-escarpment-88131.herokuapp.com/api/products';
const ROOT = 'https://world.openfoodfacts.org/api/v0/product/';
const scanned = {};

export default class Barcode extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AsyncStorage.getItem('userDetails', (err, result) => {
      let val = JSON.parse(result);
      this.setState({
        userDetails: val
      });
    });
  }
  scanBarcode (data) {
    if (scanned[data.data]) return;
    scanned[data.data] = true;
    let EAN = data.data;
    this.props.navigation.navigate('Recycable', {code: EAN});
    Vibration.vibrate();
  }
  render () {
    if (this.state.userDetails === null) return (
      <View style={styles.containerMain}>
        <Image style={styles.logoError} source={require('../images/recycascan.png')}/>
        <Text style={styles.titleError}>Please enter a postcode</Text>
      </View>
    )
      let {width, height} = Dimensions.get('window');
    return (
      <View style={styles.preview}>
      <Camera
        ref={(cam) => {this.camera = cam;}}
        style={styles.preview}
        onBarCodeRead={code => this.scanBarcode(code)}
        aspect={Camera.constants.Aspect.fill}>
      </Camera>
      <View
        style={{
          position: 'absolute',
          top: -width/2 + 100,
          left: -width/2 + 50,
          right: -width/2 + 50,
          bottom: -width/2 + 200,
          backgroundColor: 'transparent',
          borderWidth: width/2,
          borderRadius: 30,
          borderColor: 'black',
          opacity: 0.6,
        }}
      />
      </View>
    )
  }
}

function getName (EAN) {
  axios
    .get(`${ROOT}/${EAN}`)
    .then(function scanBarcode (data) {
      // alert(`${data.data.products[0].name} (${EAN}) Packaging: ${data.data.products[0].packaging}`)
      alert(`${data.data.product.product_name} (${EAN}) Packaging: ${data.data.product.packaging}`)
    })
    .catch(function (err) {
      alert(`PRODUCT ${EAN} DOES NOT EXIST`)
    })
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  containerMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#ddf4c5'
  },
  logoError: {
    marginTop: 30,
    marginBottom: 30,
    width: 100,
    height: 50
  },
  titleError: {
    marginBottom: 30,
    fontSize: 20,
    color: '#004400',
  }
});
