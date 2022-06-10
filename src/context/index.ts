import {useContext} from 'react';
import {AppContext, AppProvider} from './App';
import {AuthContext, AuthProvider} from './Auth';

const useApp = () => {
  return useContext(AppContext);
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {useApp, AppProvider, useAuth, AuthProvider};
