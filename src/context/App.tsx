import React, {createContext, useContext, useEffect, useState} from 'react';
import {AppContextModel, ReactChildrenProps} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {darkTheme, lightTheme, ThemeProps} from '../styles/theme';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components';

export const AppContext: React.Context<AppContextModel> =
  createContext<AppContextModel>({} as AppContextModel);

const AppProvider: React.FC<ReactChildrenProps> = ({children}) => {
  const [language, setLanguage] = useState<string>('pt');
  const deviceTheme: ColorSchemeName = useColorScheme();

  const [theme, setTheme] = useState<ThemeProps>(lightTheme);
  useEffect(() => {
    const checkThemeOnAppStartUp = async () => {
      const checkIfAsyncStorageHasTheme = await AsyncStorage.getItem('theme');

      if (!checkIfAsyncStorageHasTheme) {
        if (deviceTheme === 'light') {
          setTheme(lightTheme);
        } else if (deviceTheme === 'dark') {
          setTheme(darkTheme);
        } else {
          console.log('deviceTheme was neither light nor dark', deviceTheme);
        }
        await AsyncStorage.setItem('theme', theme!.key);
        return theme;
      }
    };
    checkThemeOnAppStartUp();
  }, []);

  const changeTheme = async () => {
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
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          theme,
          language,
          changeTheme,
        }}>
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export {AppProvider};
