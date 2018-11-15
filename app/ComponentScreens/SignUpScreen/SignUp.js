import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  AsyncStorage
} from "react-native";
import firebase from "react-native-firebase";
import Spinner from "react-native-loading-spinner-overlay";

var Token;

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      user: null,
      errMessage: null,
      loading: false,
      uid: ""
    };

    // firebase
    //   .messaging()
    //   .getToken()
    //   .then(token => {
    //     console.warn("Device firebase Token: ", token);
    //     Token = token;
    //   });
  }

  getRef() {
    return firebase.database().ref();
  }

  static navigationOptions = {
    header: null
  };

  async handleSignUp() {
    this.setState({ loading: true });
    const { email, password, name } = this.state;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(currentUser => {
        this.setState({ user: currentUser, loading: false });
      })
      .catch(error =>
        this.setState({ errorMessage: error.message, loading: false })
      );

    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("password", password);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid, user.email);
        this.getRef()
          .child("friends")
          .push({
            email: email,
            uid: user.uid,
            name: this.state.name,
            token: Token
          });
        this.props.navigation.navigate("MainScreen");
        this.setState({
          loading: false
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Sign Up</Text>

        {this.state.errMessage && (
          <Text style={styles.error}>{this.state.errMessage}</Text>
        )}

        <KeyboardAvoidingView style={styles.keyboard}>
          <TextInput
            style={styles.textInput}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
            placeholder="Name"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.focus()}
          />

          <TextInput
            style={styles.textInput}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            returnKeyType="next"
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordCInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Email"
          />

          <TextInput
            style={styles.textInput}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            ref={input => (this.passwordCInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            returnKeyType="next"
            secureTextEntry
          />

          <TextInput
            style={styles.textInput}
            value={this.state.password}
            onChangeText={password_confirmation =>
              this.setState({ password_confirmation })
            }
            placeholder="Confirm Password"
            secureTextEntry={true}
            returnKeyType="go"
            secureTextEntry
            ref={input => (this.passwordInput = input)}
          />
        </KeyboardAvoidingView>

        <Button title="Sign Up" onPress={this.handleSignUp.bind(this)} />

        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        />

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
  },
  error: {
    margin: 8,
    marginBottom: 0,
    color: "red",
    textAlign: "center"
  }
});
