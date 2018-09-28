
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Main from './components/Main';
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/Login';

const RootStack = StackNavigator(
  {
    LoadingScreen: { screen : Loading},
    SignUpScreen: { screen : SignUp},
    LoginScreen: { screen : Login},
    MainScreen: { screen : Main}
  },
  {
    initialRouteName: 'SignUpScreen'
  }
)

export default class App extends React.Component {
  render() {
    return <RootStack/>
  }
}