import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {LoadingView} from './Styled.LoadingScreen';
import {useAppSettings} from '../../context';

/**
 *
 * @returns The initial loading screen on app startup.
 */
const LoadingScreen = () => {
  const {theme} = useAppSettings();

  return (
    <LoadingView>
      <ActivityIndicator size="large" color={theme.screen.primaryColor} />
    </LoadingView>
  );
};

export default LoadingScreen;
