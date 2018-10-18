import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';

import MessagesScreen from '../ComponentScreens/MessagesScreen';
import ActiveScreen from '../ComponentScreens/ActiveScreen';
import GroupsScreen from '../ComponentScreens/GroupsScreen';

import AppStyles from '../Config/styles';

export const HomeTabNavigation = createMaterialTopTabNavigator(
    {
        MessagesScreen: {
            screen: MessagesScreen,
            navigationOptions: { header: null, title: 'Messages' }
        },

        ActiveScreen: {
            screen: ActiveScreen,
            navigationOptions: { header: null, title: 'Active' }
        },
        GroupsScreen: {
            screen: GroupsScreen,
            navigationOptions: { header: null, title: 'Groups' }
        }
    },
    {
        tabBarPosition: 'top',
        tabBarOptions: {
            activeTintColor: AppStyles.colors.accentColor,
            inactiveTintColor: AppStyles.colors.inactiveGreyColor,
            pressColor: AppStyles.colors.lightGreyCOlor,
            labelStyle: {
                fontWeight: 'bold',
                fontSize: Platform.OS === 'ios' ? 11 : 12,
                fontFamily: AppStyles.fonts.FONT_MEDIUM
            },
            indicatorStyle: {
                backgroundColor: AppStyles.colors.accentColor
            },
            style: {
                backgroundColor: 'white'
            }
        }
    }
);
