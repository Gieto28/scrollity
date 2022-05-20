import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './src/navigation/AppStack/AppStack';
import AuthStack from './src/navigation/AuthStack/AuthStack';
import {ThemeProvider} from 'styled-components';
import useDeviceColor from './src/hooks/useDeviceColor';

const App: React.FC = () => {
  const isSignedIn = true;
  const renderApp = () => {
    return isSignedIn ? <AppStack /> : <AuthStack />;
  };

  // custom hook that returns the object theme
  const theme = useDeviceColor();

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{renderApp()}</NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
