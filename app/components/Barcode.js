import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Camera from 'react-native-camera';
import axios from 'axios';
import _ from 'underscore';

// const ROOT = 'https://gentle-escarpment-88131.herokuapp.com/api/products';
const ROOT = 'https://world.openfoodfacts.org/api/v0/product/';
const scanned = {};

export default class Barcode extends Component {
  scanBarcode (data) {
    if (scanned[data.data]) return;
    scanned[data.data] = true;
    let EAN = data.data;
    this.props.navigation.navigate('Recycable', {code: EAN});
  }
  render () {
    return (
      <Camera
        ref={(cam) => {this.camera = cam;}}
        style={styles.preview}
        onBarCodeRead={code => this.scanBarcode(code)}
        aspect={Camera.constants.Aspect.fill}>
      </Camera>
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
  }
});
