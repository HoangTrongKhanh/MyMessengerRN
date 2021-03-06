import React from 'react';
import { createStackNavigator } from 'react-navigation';
//import SplashScreen from 'src/screens/SplashScreen';
//import ChatScreen from 'src/screens/ChatScreen';
import MessageScreen from '../ComponentScreens/MessagesScreen'
//import CameraScreen from 'src/screens/CameraScreen';
//import SearchScreen from 'src/screens/SearchScreen';

import { BottomTabNavigation } from './BottomTabNavigation';
import ChatScreen from '../ComponentScreens/ChatScreen';
//import { HomeTabNavigation } from './HomeTabNavigation';
//import SearchHeader from 'src/components/SearchHeader';

const SearchStack = createStackNavigator(
    {
        BottomTabNavigation: {
            screen: BottomTabNavigation,
            navigationOptions: {
                gesturesEnabled: false
            }
        },
        // SearchScreen: {
        //     screen: SearchScreen,
        //     navigationOptions: { gesturesEnabled: false }
        // }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

const ModalStack = createStackNavigator(
    {
        SearchStack: {
            screen: SearchStack,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                header: null
            })
        },
        // CameraScreen: {
        //     screen: CameraScreen,
        //     navigationOptions: { gesturesEnabled: false, header: null }
        // }
    },
    {
        mode: 'modal'
    }
);

const MessengerApp = createStackNavigator({
    // SplashScreen: {
    //     screen: SplashScreen,
    //     navigationOptions: { gesturesEnabled: false, header: null }
    // },
    
    MainScreen: {
        screen: ModalStack,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    ChatScreen:{
        screen: ChatScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },
    MessageScreen: {
        screen: MessageScreen,
        navigationOptions: { gesturesEnabled: false, header: null }
    },

});

export default MessengerApp;
