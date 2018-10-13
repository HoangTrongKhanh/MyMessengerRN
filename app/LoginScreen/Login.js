import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import Button from "react-native-button";
import firebase from "react-native-firebase";

import { LoginButton, LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";
import Spinner from "react-native-loading-spinner-overlay";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.unsubcriber = null;

    this.state = {
      email: "",
      password: "",
      user: null,
      loading: false,
      errorMessage: null
    };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("MainScreen");
        this.setState({
          loading: false
        });
      }
    });
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(changedUser => {
      // console.log(`changed User : ${JSON.stringify(changedUser.toJSON())}`);
      this.setState({ user: changedUser });
    });
    GoogleSignin.configure({
      iosClientId:
        "183713302525-ia1gm1taicmn8r5chnkal2ckp1rjvt2i.apps.googleusercontent.com"
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  async handleLogin() {
    this.setState({ errorMessage: null, loading: true });
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        this.setState({ user: currentUser, loading: false });
      })
      .catch(error =>
        this.setState({ errorMessage: error.message, loading: false })
      );

    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
  }

  handleLoginFacebook = () => {
    LoginManager.logInWithReadPermissions(["public_profile", "email"])
      .then(result => {
        if (result.isCancelled) {
          return Promise.reject(new Error("The user cancelled the request"));
        }
        console.log(
          `Login success with permissions: ${result.grantedPermissions.toString()}`
        );
        // get the access token
        return AccessToken.getCurrentAccessToken();
      })
      .then(data => {
        const credential = firebase.auth.FacebookAuthProvider.credential(
          data.accessToken
        );
        return firebase.auth().signInWithCredential(credential);
      })
      .then(currentUser => {
        this.setState({ user: currentUser });
        console.log(
          `Facebook Login with user : ${JSON.stringify(
            currentUser.additionalUserInfo.profile.name
          )}`
        );
      })
      .then(() => this.props.navigation.navigate("MainScreen"))
      .catch(error => {
        console.log(`Facebook login fail with error: ${error}`);
      });
  };

  handleLoginGoogle = () => {
    GoogleSignin.signIn()
      .then(data => {
        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(
          data.idToken,
          data.accessToken
        );

        // login with credential
        return firebase.auth().signInWithCredential(credential);
      })
      .then(currentUser => {
        this.setState({ user: currentUser });
        `Google Login with user : ${JSON.stringify(
          currentUser.additionalUserInfo.profile.name
        )}`;
      })
      .then(() => this.props.navigation.navigate("MainScreen"))
      .catch(error => {
        console.log(`Login fail with error: ${error}`);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Login</Text>

        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}

        <KeyboardAvoidingView style={styles.keyboard}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            returnKeyType="next"
            autoCapitalize="none"
            keyboardType="email-address"
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry
            returnKeyType="go"
            autoCapitalize="none"
            ref={input => (this.passwordInput = input)}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </KeyboardAvoidingView>

        <Button onPress={this.handleLogin.bind(this)}>Login</Button>

        <Button
          containerStyle={{
            padding: 10,
            width: 150,
            margin: 20,
            borderRadius: 4,
            backgroundColor: "rgb(68,105,176)"
          }}
          style={{ fontSize: 18, color: "white" }}
          onPress={this.handleLoginFacebook}
        >
          Login Facebook
        </Button>

        <Button
          containerStyle={{
            padding: 10,
            width: 150,
            margin: 20,
            borderRadius: 4,
            backgroundColor: "rgb(204,84,65)"
          }}
          style={{ fontSize: 18, color: "white" }}
          onPress={this.handleLoginGoogle}
        >
          Login Google
        </Button>

        <Button onPress={() => this.props.navigation.navigate("SignUpScreen")}>
          Don't have an account? Sign Up
        </Button>

        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8
  },
  keyboard: {
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  }
});
