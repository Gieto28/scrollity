import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthProvider} from './src/context/Auth';
import Route from './src/navigation/Route';
import {AppProvider} from './src/context';

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
