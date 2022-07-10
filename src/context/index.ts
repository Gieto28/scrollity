import {useContext} from 'react';
import {AppSettingsContext, AppSettingsProvider} from './AppSettingsContext';
import {AuthContext, AuthProvider} from './AuthContext';

const useAppSettings = () => {
  return useContext(AppSettingsContext);
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {
  // app settings context
  useAppSettings,
  AppSettingsProvider,
  //auth context
  useAuth,
  AuthProvider,
};
