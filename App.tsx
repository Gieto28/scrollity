import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import Route from './src/navigation/Route';
import {AppSettingsProvider} from './src/context';

const App: React.FC = () => {
  // custom hook that returns the object theme

  return (
    <AuthProvider>
      <AppSettingsProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </AppSettingsProvider>
    </AuthProvider>
  );
};

export default App;
