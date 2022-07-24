import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen, SettingsScreen} from '../../screens';
import {ProfileStackParams} from '../../models';

const ProfileStack = createNativeStackNavigator<ProfileStackParams>();

/**
 * @returns In development mode
 */
const ProfileScreenStack = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileScreenStack;
