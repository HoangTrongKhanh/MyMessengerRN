import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from "react-native";
import firebase from "react-native-firebase";

export default class SignUp extends Component {
  static navigationOptions = {
    header: null
  };

  state = { email: "", password: "", errMessage: null };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate("MainScreen"))
      .catch(error => this.setState({ errMessage: error.message }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>Sign Up</Text>

        {this.state.errMessage && (
          <Text style={{ color: "red" }}>{this.state.errMessage}</Text>
        )}

        <KeyboardAvoidingView style={styles.keyboard}>
          <TextInput
            style={styles.textInput}
            returnKeyType="next"
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />

          <TextInput
            style={styles.textInput}
            secureTextEntry
            returnKeyType="go"
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
        </KeyboardAvoidingView>

        <Button title="Sign Up" onPress={this.handleSignUp} />

        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate("LoginScreen")}
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
  },
  keyboard: {
    margin: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  }
});
