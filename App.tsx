import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './src/navigation/AppStack/AppStack';
import AuthStack from './src/navigation/AuthStack/AuthStack';

export type NavigatorProps = {
  AuthStack: undefined;
  HomeScreen: undefined;
  LoginScreen: undefined;
  NotificationsScreen: undefined;
  ProfileScreen: undefined;
};

const App: React.FC = () => {
  const renderApp = () => {
    const isLoggedIn = true;
    if (isLoggedIn) {
      return <AppStack />;
    }

    return <AuthStack />;
  };

  return <NavigationContainer>{renderApp()}</NavigationContainer>;
};

export default App;
