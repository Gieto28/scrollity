import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {AuthProvider} from './src/context/Auth';
import Route from './src/navigation/Route';
import {ThemeProps} from './src/styles/theme';
import {AppProvider, useApp} from './src/context/App';
import useDeviceColor from './src/hooks/useDeviceColor';

const App: React.FC = () => {
  // custom hook that returns the object theme

  return (
    <AppProvider>
      <AuthProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
