
import React from 'react';
import { StackNavigator } from 'react-navigation';

import Main from './app/MainScreen/Main';
import Loading from './app/Loading';
import SignUp from './app/SignUpScreen/SignUp';
import Login from './app/LoginScreen/Login';

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