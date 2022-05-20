import React, {useState} from 'react';
import {NotificationsScreen} from '../../screens';
import {HomeScreen} from '../../screens';
import {ProfileScreen} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useDeviceColor from '../../hooks/useDeviceColor';
import {NavIconComponent} from '../../components';

export type NavigatorProps = {
  HomeScreen: () => JSX.Element;
  LoginScreen: () => JSX.Element;
  NotificationsScreen: () => JSX.Element;
  ProfileScreen: () => JSX.Element;
};

const AppStackNavigation = createBottomTabNavigator<NavigatorProps>();

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
      initialRouteName="HomeScreen"
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
            setNotificationAmount(0);
          },
        }}
        options={{
          tabBarBadge: notificationAmount ? notificationAmount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: theme.fonts.colors.primary,
            color: theme.nav.notificationNumberColor,
            fontWeight: '800',
          },
          tabBarAccessibilityLabel: 'Button to Notifications Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} source={notificationIcon} />
          ),
        }}
      />
      <AppStackNavigation.Screen
        name="HomeScreen"
        component={HomeScreen}
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
