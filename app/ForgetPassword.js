import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  StatusBar
} from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import firebase from "react-native-firebase";

export default class ForgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      loading: false
    };
  }

  static navigationOptions = {
    header: null
  };

  handleForgetPress() {
    this.setState({ errorMessage: null, loading: true });
    const { email } = this.state;

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ loading: false });
        setTimeout(() => {
          Alert.alert(
            "Success!",
            "Email message was sent to you",
            [
              {
                text: "OK",
                style: "cancel"
              }
            ],
            { cancelable: false }
          );
        }, 100);
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({
          errorMessage,
          loading: false
        });
      });
  }

  renderErrorMessage = () => {
    if (this.state.errorMessage) {
      setTimeout(() => {
        Alert.alert(
          "Opp!",
          `${this.state.errorMessage}`,
          [
            {
              text: "OK",
              style: "cancel",
              onPress: () => this.setState({ errorMessage: null })
            }
          ],
          { cancelable: false }
        );
      }, 100);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleForgetPress.bind(this)}
        >
          <Text style={styles.buttonText}>Forget Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        {this.renderErrorMessage()}

        <Spinner visible={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#16a085",
    padding: 20,
    paddingTop: 40
  },
  input: {
    height: 40,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#fff",
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700"
  }
});
