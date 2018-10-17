import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
//import UserInfo from '../ComponentScreens/Authentication';
import MessagesScreen from '../ComponentScreens/MessagesScreen/index';
//import Setting from '../ComponentScreens/OrderHistory';

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
        <TabNavigator/>
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

const TabNavigator = createMaterialBottomTabNavigator({
  //UserInfo: { screen: UserInfo },
  MessagesScreen: { screen: MessagesScreen },
  //Setting: { screen: Setting },
},
{
  initialRouteName: 'MessagesScreen',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});