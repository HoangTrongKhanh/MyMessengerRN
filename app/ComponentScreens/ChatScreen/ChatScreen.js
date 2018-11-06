import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import ChatMessenger from '../../Components/react-native-messenger';

export default class ChatScreen extends Component {
    onBackPress = () => {
        this.props.navigation.goBack();
    };
    render() {
        return (
            <View >
                <ChatMessenger onBackPress={this.onBackPress} />
            </View>
        );
    }
}
ChatScreen.propTypes = {
    navigation: PropTypes.object
};
