import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";

import Main from "./app/MainScreen/Main";
import SignUp from "./app/ComponentScreens/SignUpScreen/SignUp";
import Login from "./app/ComponentScreens/LoginScreen/Login";
import Chat from "./app/Chat";
import GloChat from "./app/GloChat";
import Friendlist from "./app/Friendlist";
import ForgetPassword from "./app/ForgetPassword";

import firebase from "react-native-firebase";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.messaging().requestPermissions();
        firebase.messaging().subscribeToTopic("chat");
        this.setState({ loading: false, authenticated: true });
      } else {
        firebase.messaging().unsubscribeFromTopic("chat");
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc
    if (!this.state.authenticated) {
      return <Login navigation={this.props.navigation} />;
    }
    return <Main navigation={this.props.navigation} />;
  }
}

export default (App = StackNavigator({
  HomeScreen: { screen: Home },
  SignUpScreen: { screen: SignUp },
  LoginScreen: { screen: Login },
  ForgetPassword: { screen: ForgetPassword },
  MainScreen: { screen: Main },
  GloChatScreen: { screen: GloChat },
  Friendlist: { screen: Friendlist },
  ChatScreen: { screen: Chat }
}));
