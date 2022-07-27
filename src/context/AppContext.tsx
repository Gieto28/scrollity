import React, {createContext, useEffect, useState} from 'react';
import {AppContextModel, ReactChildrenProps} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {darkTheme, lightTheme, ThemeProps} from '../styles/theme';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {useTranslation} from 'react-i18next';

export const AppContext: React.Context<AppContextModel> =
  createContext<AppContextModel>({} as AppContextModel);

/**
 * This provider is global, it's responsible for storing the application settings such as the theme and the language
 *
 * @returns AppSettings Provider being used in the app.tsx file
 */
const AppProvider: React.FC<ReactChildrenProps> = ({children}) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const deviceTheme: ColorSchemeName = useColorScheme();
  const [theme, setTheme] = useState<ThemeProps>(lightTheme);

  useEffect(() => {
    const checkAppConfiguration = async (): Promise<ThemeProps | undefined> => {
      const checkIfAsyncStorageHasTheme: string | null =
        await AsyncStorage.getItem('theme');

      if (!checkIfAsyncStorageHasTheme) {
        deviceTheme === 'light' ? setTheme(lightTheme) : null;
        deviceTheme === 'dark' ? setTheme(darkTheme) : null;
        await AsyncStorage.setItem('theme', theme!.key);
        return theme;
      }

      if (checkIfAsyncStorageHasTheme) {
        checkIfAsyncStorageHasTheme === 'light' ? setTheme(lightTheme) : null;
        checkIfAsyncStorageHasTheme === 'dark' ? setTheme(darkTheme) : null;
      }

      const storedLang: string | null = await AsyncStorage.getItem('lang');

      switch (storedLang) {
        case 'en':
          i18n.changeLanguage('en');
          await AsyncStorage.setItem('lang', 'en');
          break;

        case 'pt':
          i18n.changeLanguage('pt');
          await AsyncStorage.setItem('lang', 'pt');
          break;

        default:
          i18n.changeLanguage('en');
          await AsyncStorage.setItem('lang', 'en');
          break;
      }
    };

    checkAppConfiguration();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeTheme = async (): Promise<void> => {
    const currentTheme: string | null = await AsyncStorage.getItem('theme');

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

  const changeLang = async () => {
    switch (lang) {
      case 'pt':
        i18n.changeLanguage('en');
        await AsyncStorage.setItem('lang', 'en');
        break;

      case 'en':
        i18n.changeLanguage('pt');
        await AsyncStorage.setItem('lang', 'pt');
        break;
    }
  };

  return (
    <AppContext.Provider
      value={{
        //states
        theme,
        changeLang,

        //functions
        changeTheme,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};
