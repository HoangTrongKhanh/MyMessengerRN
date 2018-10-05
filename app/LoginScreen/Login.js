import React, {Component} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
import Button from 'react-native-button';
import firebase from "react-native-firebase";
import { LoginButton, LoginManager, AccessToken } from 'react-native-fbsdk';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };

    state = {email: "", password: "", errorMessage: null};

    handleLogin = () => {
        const {email, password} = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate("MainScreen"))
            .catch(error => this.setState({errorMessage: error.message}));
    };

    handleLoginFacebook = () => {
        LoginManager
            .logInWithReadPermissions(['public_profile', 'email'])
            .then((result) => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('The user cancelled the request'));
                }
                console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);
                // get the access token
                return AccessToken.getCurrentAccessToken();
            })
            .then(data => {
                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                return firebase.auth().signInWithCredential(credential);
            })
            .then((currentUser) => {
                console.log(`Facebook Login with user : ${JSON.stringify(currentUser.additionalUserInfo.profile.name)}`);
            })
            .then(() => this.props.navigation.navigate("MainScreen"))
            .catch((error) => {
                console.log(`Facebook login fail with error: ${error}`);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                {this.state.errorMessage && (
                    <Text style={{color: "red"}}>{this.state.errorMessage}</Text>
                )}

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({email})}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({password})}
                    value={this.state.password}
                />

                <Button title="Login" onPress={this.handleLogin}/>

                <Button containerStyle={{
                    padding: 10,
                    width: 150,
                    margin: 20,
                    borderRadius: 4,
                    backgroundColor: 'rgb(68,105,176)'
                }}
                        style={{fontSize: 18, color: 'white'}}
                        onPress={this.handleLoginFacebook}>
                    Login Facebook
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
