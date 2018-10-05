import React, { Component } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import firebase from "react-native-firebase";

export default class Loading extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "MainScreen" : "SignUpScreen");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
