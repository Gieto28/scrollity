import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {useAuth} from '../context/Auth';
import {AuthLoadingScreen} from '../screens';
import AppStack from './AppStack/AppStack';
import AuthStack from './AuthStack/AuthStack';

const Route: React.FC = () => {
  const {isSignedIn, loading} = useAuth();
  const [appState, setAppState] = useState<string>(AppState.currentState);

  useEffect(() => {
    const handleAppState = AppState.addEventListener('change', nextAppState => {
      console.log('next app state is: ' + nextAppState);
      setAppState(nextAppState);
    });
    console.log('removing event listener...');
    return () => handleAppState.remove();
  }, [appState]);

  if (loading) return <AuthLoadingScreen />;

  return isSignedIn ? <AppStack /> : <AuthStack />;
};

export default Route;
