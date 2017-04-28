import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        title: 'Longley Lane',
        latitude: 53.3977763,
        longitude: -2.248374799999965
      }]
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 53.3977763,
            longitude: -2.248374799999965,
            latitudeDelta: 0.5,
            longitudeDelta: 0.5,
          }}
        >
          {this.state.markers.map((marker, i) => {
            return (
              <MapView.Marker
                key={i}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.title}
              />
            );
          })}

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});