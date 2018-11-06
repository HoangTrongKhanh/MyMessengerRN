import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import Toolbar from './Toolbar';
import InputModule from './InputModule';
import KeyboardSpacer from '../KeyboardSpacer';

export default class Messenger extends Component {
    onBackPress = () => {
        this.props.onBackPress();
    };

    dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    render() {
        return (
            <View >
                <Toolbar onBackPress={this.onBackPress} />
                <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                    <View />
                </TouchableWithoutFeedback>
                <InputModule />
                {Platform.OS === 'ios' && <KeyboardSpacer />}
            </View>
        );
    }
}
Messenger.propTypes = {
    navigation: PropTypes.object,
    onBackPress:PropTypes.func
};
