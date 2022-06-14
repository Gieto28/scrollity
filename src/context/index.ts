import {useContext} from 'react';
import {AppContext, AppProvider} from './AppContext';
import {AppSettingsContext, AppSettingsProvider} from './AppSettingsContext';
import {AuthContext, AuthProvider} from './AuthContext';

const useAppSettings = () => {
  return useContext(AppSettingsContext);
};

const useAuth = () => {
  return useContext(AuthContext);
};

const useApp = () => {
  return useContext(AppContext);
};

export {
  //app context
  useApp,
  AppProvider,
  // app settings context
  useAppSettings,
  AppSettingsProvider,
  //auth context
  useAuth,
  AuthProvider,
};
