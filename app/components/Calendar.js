import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from "react-native";
import axios from 'axios';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      userDetails: {},
      detailsRecieved: false
    };
    this.getCollections = this.getCollections.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('userDetails', (err, result) => {
      let val = JSON.parse(result);
      this.setState({
        userDetails: val,
        detailsRecieved: true
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
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <ScrollView>
            {this.state.collections.map((collection, key) => {
                return (
                  <View key={key}>
                    <Text style={styles.date}>
                      {collection.day.toString()} {collection.month.toString()} {collection.year.toString()} ({collection.council.toString()})
                    </Text>
                    <Text>
                      {collection.bins.toString()}
                    </Text>
                  </View>
                )
              })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  data: {
    paddingBottom: 10,
    fontSize: 20
  }
});
