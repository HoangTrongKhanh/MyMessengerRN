import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "react-native-button";
import firebase from "react-native-firebase";
import { LoginButton, LoginManager, AccessToken } from "react-native-fbsdk";
import { GoogleSignin } from "react-native-google-signin";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.unsubcriber = null;
    this.state = {
      isAuthenticated: false,
      email: "",
      password: "",
      user: null,
      errorMessage: null
    };
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

  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        this.setState({ user: currentUser });
      })
      .then(() => this.props.navigation.navigate("MainScreen"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

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

  onLoginGoogle = () => {
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
        <Text>Login</Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}

        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button title="Login" onPress={this.handleLogin} />

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
          onPress={this.onLoginGoogle}
        >
          Login Google
        </Button>

        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("SignUpScreen")}
        />
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
  }
});
