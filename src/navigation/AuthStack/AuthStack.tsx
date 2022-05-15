import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen/SignUpScreen';

export type AuthStackParams = {
  Login: undefined;
  SignUp: undefined;
};

const AuthStackNavigator = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStackNavigator.Screen name="Login" component={LoginScreen} />
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
