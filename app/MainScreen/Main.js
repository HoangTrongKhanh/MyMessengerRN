import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.navigation.navigate("LoginScreen"));
  };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi {currentUser && currentUser.email}!</Text>
        <Button title="LOG OUT" onPress={this.LogOut} />
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
