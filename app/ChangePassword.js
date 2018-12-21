import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Keyboard,
  StyleSheet
} from "react-native";
import { Button } from "react-native-elements";
import firebase from "react-native-firebase";

const pwRegex = `Passwords must be
- At least 8 characters long
- Include at least 1 lowercase letter
- 1 capital letter
- 1 number
- 1 special character (!@#$%^&*)`;

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.state.params.currentUser,
      oldPw: "",
      newPw: "",
      confirmPW: ""
    };
  }

  passwordValidation = pw => {
    const reg = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    return reg.test(pw);
  };

  static navigationOptions = {
    title: "Change Password"
  };

  async onSubmitPress() {
    Keyboard.dismiss();
    const { user, oldPw, newPw, confirmPW } = this.state;

    if (newPw === confirmPW) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, oldPw)
        .then(async () => {
          // Alert.alert("Password correct!", "", [
          //   {
          //     text: "OK",
          //     style: "cancel"
          //   }
          // ]);
          if (this.passwordValidation(newPw)) {
            // Update password
            await firebase
              .auth()
              .currentUser.updatePassword(newPw)
              .then(() => {
                Alert.alert("Success!", "Password changed successfully", [
                  {
                    text: "OK",
                    style: "cancel",
                    onPress: () => {
                      firebase
                        .auth()
                        .signOut()
                        .then(() => this.props.navigation.push("LoginScreen"));
                    }
                  }
                ]);
              });
          } else {
            Alert.alert("Weak Password!", pwRegex, [
              {
                text: "OK",
                style: "cancel"
              }
            ]);
          }
        })
        .catch(() => {
          Alert.alert("Password incorrect!", "", [
            {
              text: "OK",
              style: "cancel"
            }
          ]);
        });
    } else {
      Alert.alert(
        "Confirm password incorrect!",
        "New password and confirm password not the same",
        [
          {
            text: "OK",
            style: "cancel"
          }
        ]
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          autoFocus
          secureTextEntry
          clearButtonMode="while-editing"
          value={this.state.oldPw}
          onChangeText={oldPw => this.setState({ oldPw })}
        />
        <Text style={styles.text}>New Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          clearButtonMode="while-editing"
          value={this.state.newPw}
          onChangeText={newPw => this.setState({ newPw })}
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry
          clearButtonMode="while-editing"
          value={this.state.confirmPW}
          onChangeText={confirmPW => this.setState({ confirmPW })}
        />

        <Button
          title="Submit"
          titleStyle={{ fontWeight: "700" }}
          onPress={this.onSubmitPress.bind(this)}
          buttonStyle={{
            backgroundColor: "rgba(16,115,185, 1)",
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10
          }}
          containerStyle={{ marginTop: 10, marginHorizontal: 3 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 18,
    paddingRight: 5
  },
  textInput: {
    height: 35,
    fontSize: 17,
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    margin: 3,
    marginBottom: 10
  }
});
