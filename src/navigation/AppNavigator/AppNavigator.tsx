import React, {useEffect, useState} from 'react';
import {NotificationsScreen} from '../../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavIconComponent} from '../../components';
import HomeScreenStack from './HomeScreenStack';
import ProfileScreenStack from './ProfileScreenStack';
import {useApp} from '../../context';
import {AppStackParams} from '../../models';

const App = createBottomTabNavigator<AppStackParams>();

/**
 *
 * @returns navigator with 3 main screens, HomeScreenStack, ProfileScreenStack and NotificationsScreen
 */
const AppNavigator: React.FC = () => {
  const {theme, notification} = useApp();

  const [notificationAmount, setNotificationAmount] = useState<number>(
    notification.length > 0 ? notification.map(n => n.seen === true).length : 0,
  );

  const notificationIcon = theme.bool
    ? require('../../assets/Images/notifications-24-dark.png')
    : require('../../assets/Images/notifications-24-light.png');

  const homeIcon = theme.bool
    ? require('../../assets/Images/infinity-30-dark.png')
    : require('../../assets/Images/infinity-30-light.png');

  const profileIcon = theme.bool
    ? require('../../assets/Images/person-24-dark.png')
    : require('../../assets/Images/person-24-light.png');

  useEffect(() => {
    setNotificationAmount(
      notification.length > 0
        ? notification.filter(n => n.seen === false).length
        : 0,
    );
  }, [notification]);

  return (
    <App.Navigator
      initialRouteName="HomeScreenStack"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveBackgroundColor: theme.nav.inactiveNavBackground,
        tabBarInactiveBackgroundColor: theme.nav.inactiveNavBackground,
        tabBarHideOnKeyboard: true,
      }}>
      <App.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          tabBarBadge: notificationAmount,
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
      <App.Screen
        name="HomeScreenStack"
        component={HomeScreenStack}
        options={{
          tabBarAccessibilityLabel: 'Button to Home Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} image={homeIcon} />
          ),
        }}
      />
      <App.Screen
        options={{
          tabBarAccessibilityLabel: 'button to Profile Screen',
          tabBarIcon: ({focused}) => (
            <NavIconComponent focused={focused} image={profileIcon} />
          ),
        }}
        name="ProfileScreenStack"
        component={ProfileScreenStack}
      />
    </App.Navigator>
  );
};

export default AppNavigator;
