import React, { Component } from "react";
import {
  View,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import firebase from "react-native-firebase";

export default class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentWillMount() {
    this.setState({ user: firebase.auth().currentUser });
  }

  // static navigationOptions = {
  //   header: null
  // };

  render() {
    console.log(this.state.user);

    const list = [
      {
        name: "Name",
        subtitle: `${
          this.state.user.displayName === null
            ? ""
            : this.state.user.displayName
        }`,
        nav: () => {
          console.log("pressing Name!");
        }
      },
      {
        name: "Email",
        subtitle: `${this.state.user.email}`,
        nav: () => {
          console.log("pressing Email!");
        }
      },
      {
        name: "Email Verified",
        subtitle: `${this.state.user.emailVerified}`,
        nav: () => {
          console.log("pressing Email Verified!");
        }
      },
      {
        name: "Password",
        subtitle: "Change Password",
        nav: () => {
          console.log("pressing Password!");
        }
      }
    ];

    return (
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ flex: 1, paddingTop: 10 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={{
              uri: "https://www.gravatar.com/avatar/"
            }}
            style={{ width: 80, height: 80, borderRadius: 25 }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          {list.map((l, i) => (
            <ListItem
              chevron
              bottomDivider
              key={i}
              title={l.name}
              subtitle={l.subtitle}
              onPress={() => l.nav()}
            />
          ))}
        </View>

        <Button title="Save" style={{ marginHorizontal: 10 }} />
      </ScrollView>
    );
  }
}
