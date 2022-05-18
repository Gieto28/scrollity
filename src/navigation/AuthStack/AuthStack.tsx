import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignInScreen} from '../../screens';
import {SignUpScreen} from '../../screens';

export type AuthStackParams = {
  SignIn: undefined;
  SignUp: undefined;
};

const AuthStackNavigator = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStackNavigator.Screen name="SignIn" component={SignInScreen} />
      <AuthStackNavigator.Screen name="SignUp" component={SignUpScreen} />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
