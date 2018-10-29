import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity
} from "react-native";

import firebase from "react-native-firebase";
import { StackNavigator } from "react-navigation";

export default class Main extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currentUser: null,
    name: ""
  };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              firebase.auth().signOut();
            }
          });
        },
        function(error) {}
      );

    this.props.navigation.navigate("LoginScreen");
  };

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hi {currentUser && currentUser.email}!</Text>

        <Button title="LOG OUT" onPress={this.LogOut} />

        <Text style={styles.title}>Enter Your Name:</Text>

        <TextInput
          style={styles.nameInput}
          placeholder={this.state.name}
          onChangeText={text => {
            this.setState({ name: text });
          }}
          value={this.state.name}
        />

        <TouchableOpacity>
          <Text
            style={styles.buttonStyle}
            onPress={() =>
              this.props.navigation.navigate("GloChatScreen", {
                name: this.state.name
              })
            }
          >
            Chat Room
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate("Friendlist")}
          >
            Friend List
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20
  },
  nameInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    margin: 20,
    alignSelf: "stretch"
  },
  buttonStyle: {
    marginLeft: 20,
    margin: 20,
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
