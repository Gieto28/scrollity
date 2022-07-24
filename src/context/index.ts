import {useContext} from 'react';
import {AppContext, AppProvider} from './AppContext';
import {AuthContext, AuthProvider} from './AuthContext';

const useApp = () => {
  return useContext(AppContext);
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {
  // app context
  useApp,
  AppProvider,
  //auth context
  useAuth,
  AuthProvider,
};
