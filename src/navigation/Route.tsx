import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {useApp, useAuth} from '../context';
import {LoadingScreen} from '../screens';
import AppNavigator from './AppNavigator/AppNavigator';
import AuthStack from './AuthStack/AuthStack';

/**
 * This file route.tsx in the folder navigation is responsible to read the asyncStorage on app startup and decide whether the **AppNavigator** should be loaded or should the **AuthStack** be loaded.
 *
 * This file is reading the "isSignedIn" from useAuth and loading. if isSignedIn is true then the **AppNavigator** will be loaded and if "isSignedIn" is false then the **AuthStack** will be loaded.
 *
 * @returns either **AuthStack** or **AuthStack** or **AuthLoadingScreen**
 */
const Route: React.FC = () => {
  const {theme} = useApp();
  const {isSignedIn, loading} = useAuth();
  const [appState, setAppState] = useState<string>(AppState.currentState);

  useEffect(() => {
    const handleAppState = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });
    return () => handleAppState.remove();
  }, [appState]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider theme={theme}>
      {isSignedIn ? <AppNavigator /> : <AuthStack />}
    </ThemeProvider>
  );
};

export default Route;
