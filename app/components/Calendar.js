import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage, Image } from "react-native";
import axios from 'axios';
import moment from 'moment';

let day = moment().format('D')
let month = moment().format('MMMM');
let year = moment().format('YYYY');
console.log(`${day} ${month} ${year}`);

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      userDetails: {}
    };
    this.getCollections = this.getCollections.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('userDetails', (err, result) => {
      let val = JSON.parse(result);
      this.setState({
        userDetails: val
      });
      this.getCollections(val.council);
    });
  }

  getCollections (council) {
    axios
      .get(`https://vast-eyrie-43528.herokuapp.com/api/collections?council=${council}`)
      .then((res) => {
        this.setState({
          collections: res.data.collections
        });
        console.log(this.state.collections[5].bins[2]);
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    if (this.state.userDetails === null) return (
      <View style={styles.containerError}>
        <Text style={styles.titleError}>Please enter a postcode</Text>
      </View>
    )
    return (
      <ScrollView>
        <View style={styles.container}>
            {this.state.collections.map((collection, key) => {
                return (
                  <View key={key}>
                    <Text style={styles.date}>
                      {collection.day.toString()} {collection.month.toString()} {collection.year.toString()} ({collection.council.toString()})
                    </Text>
                    {collection.bins.map((bin, i) => {
                      return (
                        <View style={styles.imageView}>
                          <Image style={styles.binImage} source={{ uri: bin }}/>
                        </View>
                      )
                    })}
                  </View>
                )
              })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerError: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  date: {
    paddingTop: 50,
    paddingBottom: 10,
    fontSize: 20
  },
  titleError: {
    fontSize: 20,
    color: 'red'
  },
  bins: {
    color: 'blue'
  },
  binImage: {
    height: 100,
    width: 65
  },
  imageView: {
    flexDirection: 'row'
  }
});
