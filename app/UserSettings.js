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
import Dialog from "react-native-dialog";
import ImagePicker from "react-native-image-picker";

export default class UserSettings extends Component {
  constructor(props) {
    super(props);

    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);

    this.state = {
      user: null,
      dialogName: false,
      dialogEmail: false,
      newName: "",
      newEmail: "",
      avatarSource: null
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  async handleUploadImage() {
    const { newName, avatarSource } = this.state;

    if (avatarSource) {
      const storage = firebase.storage();
      const sessionId = new Date().getTime();
      const imageRef = storage
        .ref("images")
        .child(`${this.state.user.email} ${sessionId}`);

      await imageRef
        .putFile(avatarSource.uri, { contentType: "image/jpeg" })
        .then(() => {
          return imageRef.getDownloadURL();

          // await firebase.auth().currentUser.updateProfile({
          //   newName,
          //   url
          // });

          // await firebase.auth().currentUser.reload();
          // console.log(firebase.auth().currentUser);
        })
        .then(async url => {
          await firebase
            .auth()
            .currentUser.updateProfile({
              newName,
              url
            })
            .then(() => {
              firebase.auth().currentUser.reload();
              console.log(firebase.auth().currentUser);
            })
            .catch(error => {
              reject(error);
              console.log("Error updating profile: ", error);
            });
        })
        .catch(error => {
          reject(error);
          console.log("Error uploading image: ", error);
        });
    }
  }

  componentWillMount() {
    this.setState({
      user: firebase.auth().currentUser
    });
  }

  componentDidMount() {
    this.setState({ newEmail: this.state.user.email });
  }

  static navigationOptions = {
    title: "User Information"
  };

  handleCancel = () => {
    this.setState({ dialogName: false, dialogEmail: false });
  };

  async handleChangeName() {
    const { newName } = this.state;
    var urlPhoto = "https://www.gravatar.com/avatar/";
    this.setState({ dialogName: false });

    if (newName.length > 0) {
      //update new name
      // await firebase.auth().currentUser.updateProfile({
      //   name,
      //   urlPhoto
      // });
      // await firebase.auth().currentUser.reload();
      // console.log(firebase.auth().currentUser);
    }
  }

  emailValidation = mail => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.length > 0 && reg.test(mail) === true) {
      return true;
    } else {
      return false;
    }
  };

  async handleChangeEmail() {
    const { newEmail } = this.state;
    this.setState({ dialogEmail: false });

    if (this.emailValidation(newEmail)) {
      if (newEmail != this.state.user.email) {
        //update email
        await firebase.auth().currentUser.updateEmail(newEmail);

        // firebase
        //   .auth()
        //   .currentUser.email.toLowerCase()
        //   .should.equal(newEmail.toLowerCase());
      }
    } else {
      console.log("Email is Not Correct");
    }

    this.setState({ newEmail: firebase.auth().currentUser.email });
  }

  render() {
    const list = [
      {
        name: "Name",
        // subtitle: `${
        //   this.state.user.displayName === null
        //     ? ""
        //     : this.state.user.displayName
        // }`,
        nav: () => {
          this.setState({ dialogName: true });
        }
      },
      {
        name: "Email",
        subtitle: `${this.state.user.email}`,
        nav: () => {
          this.setState({ dialogEmail: true });
        }
      },
      {
        name: "Email Verified",
        subtitle: `${this.state.user.emailVerified}`,
        nav: () => {
          if (!this.state.user.emailVerified)
            Alert.alert("Email Verified", "Send Email Verification", [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
              },
              {
                text: "OK",
                onPress: () => {
                  firebase.auth().currentUser.sendEmailVerification();
                },
                style: "destructive"
              }
            ]);
        }
      },
      {
        name: "Password",
        subtitle: "Change Password",
        nav: () => {
          this.props.navigation.navigate("ChangePassword", {
            currentUser: this.state.user
          });
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
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            {this.state.avatarSource === null ? (
              <Image
                source={{
                  uri: "https://www.gravatar.com/avatar/"
                }}
                style={{ width: 80, height: 80, borderRadius: 25 }}
              />
            ) : (
              <Image
                style={{ width: 80, height: 80, borderRadius: 25 }}
                source={this.state.avatarSource}
              />
            )}
            {/* <Image
              source={{
                uri: "https://www.gravatar.com/avatar/"
              }}
              style={{ width: 80, height: 80, borderRadius: 25 }}
            /> */}
          </TouchableOpacity>
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

        <Dialog.Container visible={this.state.dialogName}>
          <Dialog.Title>Change Name</Dialog.Title>
          <Dialog.Description>Please enter your full name</Dialog.Description>
          <Dialog.Input
            value={this.state.newName}
            onChangeText={newName => this.setState({ newName })}
          />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button
            label="OK"
            onPress={this.handleChangeName.bind(this)}
          />
        </Dialog.Container>

        <Dialog.Container visible={this.state.dialogEmail}>
          <Dialog.Title>Change Email</Dialog.Title>
          <Dialog.Description>
            Please enter a valid email address
          </Dialog.Description>
          <Dialog.Input
            value={this.state.newEmail}
            onChangeText={newEmail => this.setState({ newEmail })}
          />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button
            label="OK"
            onPress={this.handleChangeEmail.bind(this)}
          />
        </Dialog.Container>

        <Button
          title="Upload Image"
          onPress={this.handleUploadImage.bind(this)}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10
          }}
          containerStyle={{ paddingHorizontal: 10 }}
        />
      </ScrollView>
    );
  }
}
