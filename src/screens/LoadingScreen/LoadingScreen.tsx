import {ActivityIndicator} from 'react-native';
import React from 'react';
import {LoadingView} from './Styled.LoadingScreen';
import {useApp} from '../../context';

/**
 *
 * @returns The initial loading screen on app startup.
 */
const LoadingScreen = () => {
  const {theme} = useApp();

  return (
    <LoadingView>
      <ActivityIndicator size="large" color={theme.screen.primaryColor} />
    </LoadingView>
  );
};

export default LoadingScreen;
