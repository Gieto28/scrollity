import React, {createContext, useEffect, useState} from 'react';
import {AppContextModel, ReactChildrenProps} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import getProfile from '../services/auth/getProfile';

export const AppContext: React.Context<AppContextModel> =
  createContext<AppContextModel>({} as AppContextModel);

const AppProvider: React.FC<ReactChildrenProps> = ({children}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const token = await AsyncStorage.getItem('token');
      const data = await getProfile(token!);
      setUser(data);
      console.log('data', data);
      console.log('user from app.tsx', user);
      return;
    };

    getUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};
