import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import useDeviceColor from './src/hooks/useDeviceColor';
import {AuthProvider} from './src/context/Auth';
import Route from './src/navigation/Route';

const App: React.FC = () => {
  // custom hook that returns the object theme
  const theme = useDeviceColor();

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
