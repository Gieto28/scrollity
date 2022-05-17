import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './src/Navigation/AppStack/AppStack';
import AuthStack from './src/Navigation/AuthStack/AuthStack';

const App: React.FC = () => {
  const renderApp = () => {
    const isSignedIn = false;

    return isSignedIn ? <AppStack /> : <AuthStack />;
  };

  return <NavigationContainer>{renderApp()}</NavigationContainer>;
};

export default App;
