import React, {createContext, useEffect, useState} from 'react';
import {AppSettingsContextModel, ReactChildrenProps} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {darkTheme, lightTheme, ThemeProps} from '../styles/theme';
import {ColorSchemeName, useColorScheme} from 'react-native';

export const AppSettingsContext: React.Context<AppSettingsContextModel> =
  createContext<AppSettingsContextModel>({} as AppSettingsContextModel);

const AppSettingsProvider: React.FC<ReactChildrenProps> = ({children}) => {
  const [language, setLanguage] = useState<string>('pt');
  const [theme, setTheme] = useState<ThemeProps>(lightTheme);

  const deviceTheme: ColorSchemeName = useColorScheme();

  useEffect(() => {
    const checkThemeOnAppStartUp = async (): Promise<
      ThemeProps | undefined
    > => {
      const checkIfAsyncStorageHasTheme = await AsyncStorage.getItem('theme');

      if (!checkIfAsyncStorageHasTheme) {
        // if error here then {} are needed
        if (deviceTheme === 'light') setTheme(lightTheme);
        if (deviceTheme === 'dark') setTheme(darkTheme);
        else console.log('deviceTheme was neither light nor dark', deviceTheme);

        await AsyncStorage.setItem('theme', theme!.key);
        return theme;
      }
    };
    checkThemeOnAppStartUp();
  }, []);

  const changeTheme = async (): Promise<void> => {
    const currentTheme = await AsyncStorage.getItem('theme');

    if (currentTheme === 'light') {
      setTheme(darkTheme);
      await AsyncStorage.setItem('theme', darkTheme.key);
      return;
    } else if (currentTheme === 'dark') {
      setTheme(lightTheme);
      await AsyncStorage.setItem('theme', lightTheme.key);
      return;
    } else {
      throw new Error(`Invalid theme ${currentTheme}`);
    }
  };

  return (
    <AppSettingsContext.Provider
      value={{
        //states
        theme,
        language,

        //functions
        changeTheme,
      }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export {AppSettingsProvider};
