import React, {createContext, useEffect, useState} from 'react';
import {AppContextModel, ReactChildrenProps} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import getProfile from '../services/auth/getProfile';

export const AppContext: React.Context<AppContextModel> =
  createContext<AppContextModel>({} as AppContextModel);

/**
 *
 * This Context is called every time the AppStack is called, it reads the async storage for the current token and it will fetch a user from the server using getProfile
 *
 * @returns App Provider being used in the navigation/route.tsx file
 */
const AppProvider: React.FC<ReactChildrenProps> = ({children}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('token from asyncStorage', token);
        const data = await getProfile(token);
        setUser(data.profile);
      } catch (error) {
        throw new Error('error while getting profile on file app context');
      }
      setLoading(false);
    };

    getUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};