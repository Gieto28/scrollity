import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {NotificationsScreen} from '../../screens';
import {HomeScreen} from '../../screens';
import {ProfileScreen} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type NavigatorProps = {
  HomeScreen: () => JSX.Element;
  LoginScreen: () => JSX.Element;
  NotificationsScreen: () => JSX.Element;
  ProfileScreen: () => JSX.Element;
};

const AppStackNavigation = createBottomTabNavigator<NavigatorProps>();

const AppStack: React.FC = () => {
  const [notificationAmount, setNotificationAmount] = useState([7]);

  return (
    <AppStackNavigation.Navigator
      initialRouteName="NotificationsScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fcf7fc',
        tabBarInactiveTintColor: '#fcf7fc',
        tabBarActiveBackgroundColor: '#262626',
        tabBarInactiveBackgroundColor: '#262626',
        tabBarHideOnKeyboard: true,
      }}>
      <AppStackNavigation.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarBadge: notificationAmount[0],
          tabBarBadgeStyle: {backgroundColor: '#24e2e5'},
        }}
      />
      <AppStackNavigation.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <AppStackNavigation.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </AppStackNavigation.Navigator>
  );
};

export default AppStack;
