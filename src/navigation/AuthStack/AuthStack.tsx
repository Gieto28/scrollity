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

/**
 * @returns Navigator with 3 main components, Auth loading screen which loads at the start of the application
 */
const AuthStack: React.FC = () => {
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
