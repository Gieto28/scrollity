import React, {useState} from 'react';
import {NotificationsScreen} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavIconComponent} from '../../components';
import HomeScreenStack from './HomeScreenStack';
import ProfileScreenStack from './ProfileScreenStack';
import {useAppSettings} from '../../context';
import {AppStackParams} from '../../models';
import AppLoadingScreen from '../../screens/AppLoadingScreen/AppLoadingScreen';

const AppStackNavigation = createBottomTabNavigator<AppStackParams>();

/**
 *
 * @returns navigator with 3 main screens, HomeScreenStack, ProfileScreenStack and NotificationsScreen
 */
const AppStack: React.FC = () => {
  const {theme} = useAppSettings();

  const notificationIcon = theme.bool
    ? require('../../assets/Images/notifications-24-dark.png')
    : require('../../assets/Images/notifications-24-light.png');

  const homeIcon = theme.bool
    ? require('../../assets/Images/infinity-30-dark.png')
    : require('../../assets/Images/infinity-30-light.png');

  const profileIcon = theme.bool
    ? require('../../assets/Images/person-24-dark.png')
    : require('../../assets/Images/person-24-light.png');

  const [notificationAmount, setNotificationAmount] = useState(5);

  return (
    <AppStackNavigation.Navigator
      initialRouteName="HomeScreenStack"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveBackgroundColor: theme.nav.inactiveNavBackground,
        tabBarInactiveBackgroundColor: theme.nav.inactiveNavBackground,
        tabBarHideOnKeyboard: true,
      }}>
      <AppStackNavigation.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        listeners={{
          tabPress: () => {
            if (notificationAmount > 0) setNotificationAmount(0);
          },
        }}
        options={{
          tabBarBadge: notificationAmount ? notificationAmount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: notificationAmount
              ? theme.fonts.colors.primary
              : undefined,
            color: notificationAmount
              ? theme.nav.notificationNumberColor
              : undefined,
            fontWeight: '800',
          },
          tabBarAccessibilityLabel: 'Button to Notifications Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} image={notificationIcon} />
          ),
        }}
      />
      <AppStackNavigation.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{
          tabBarAccessibilityLabel: 'Button to Home Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} image={homeIcon} />
          ),
        }}
      />
      <AppStackNavigation.Screen
        options={{
          tabBarAccessibilityLabel: 'button to Profile Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} image={profileIcon} />
          ),
        }}
        name="ProfileScreenStack"
        component={ProfileScreenStack}
      />
    </AppStackNavigation.Navigator>
  );
};

export default AppStack;
