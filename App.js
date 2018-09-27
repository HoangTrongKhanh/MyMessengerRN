
import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { SwitchNavigator } from 'react-navigation';

import Main from './components/Main';
import Loading from './components/Loading';
import SignUp from './components/SignUp';
import Login from './components/Login';

const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main
  },
  {
    initRouteName: 'Loading'
  }
)

export default App;