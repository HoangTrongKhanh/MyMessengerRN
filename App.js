import React, { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { StackNavigator } from "react-navigation";

import Main from "./app/MainScreen/Main";
import Loading from "./app/Loading";
import SignUp from "./app/SignUpScreen/SignUp";
import Login from "./app/LoginScreen/Login";

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
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    //if (this.state.loading) return null; // Render loading/splash screen etc
    // if (!this.state.authenticated) {
    //   return <Login navigation={this.props.navigation} />;
    // }
    return <Main navigation={this.props.navigation} />;
  }
}

export default (App = StackNavigator({
  HomeScreen: { screen: Home },
  LoadingScreen: { screen: Loading },
  SignUpScreen: { screen: SignUp },
  LoginScreen: { screen: Login },
  MainScreen: { screen: Main }
}));
