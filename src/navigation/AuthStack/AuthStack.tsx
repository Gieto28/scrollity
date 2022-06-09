import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthLoadingScreen, SignInScreen} from '../../screens';
import {SignUpScreen} from '../../screens';

export type AuthStackParams = {
  SignInScreen: () => JSX.Element;
  SignUpScreen: undefined;
  VerifyAuthRouteScreen: () => JSX.Element;
  AuthLoadingScreen: () => JSX.Element;
};

const AuthStackNavigator = createNativeStackNavigator<AuthStackParams>();

const AuthStack = () => {
  return (
    <AuthStackNavigator.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStackNavigator.Screen name="SignInScreen" component={SignInScreen} />
      <AuthStackNavigator.Screen name="SignUpScreen" component={SignUpScreen} />
      <AuthStackNavigator.Screen
        name="AuthLoadingScreen"
        component={AuthLoadingScreen}
      />
    </AuthStackNavigator.Navigator>
  );
};

export default AuthStack;
