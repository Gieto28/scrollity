import React, {useState} from 'react';
import {NotificationsScreen, ProfileScreen} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useDeviceColor from '../../hooks/useDeviceColor';
import {NavIconComponent} from '../../components';
import HomeScreenStack, {HomeStackParams} from './HomeScreenStack';

type NavigationParams = {
  HomeScreenStack: HomeStackParams;
  LoginScreen: () => JSX.Element;
  NotificationsScreen: () => JSX.Element;
  ProfileScreen: () => JSX.Element;
};

const AppStackNavigation = createBottomTabNavigator<NavigationParams>();

const AppStack: React.FC = () => {
  const theme = useDeviceColor();

  const [notificationAmount, setNotificationAmount] = useState(5);

  const notificationIcon = theme.bool
    ? require('../../assets/Images/notifications-24-dark.png')
    : require('../../assets/Images/notifications-24-light.png');

  const homeIcon = theme.bool
    ? require('../../assets/Images/infinity-30-dark.png')
    : require('../../assets/Images/infinity-30-light.png');

  const profileIcon = theme.bool
    ? require('../../assets/Images/person-24-dark.png')
    : require('../../assets/Images/person-24-light.png');

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
            <NavIconComponent focused={focused} source={notificationIcon} />
          ),
        }}
      />
      <AppStackNavigation.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{
          tabBarAccessibilityLabel: 'Button to Home Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} source={homeIcon} />
          ),
        }}
      />
      <AppStackNavigation.Screen
        options={{
          tabBarAccessibilityLabel: 'button to Profile Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} source={profileIcon} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </AppStackNavigation.Navigator>
  );
};

export default AppStack;
