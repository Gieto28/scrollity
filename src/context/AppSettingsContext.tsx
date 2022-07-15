import React, {createContext, useEffect, useState} from 'react';
import {AppSettingsContextModel, ReactChildrenProps} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {darkTheme, lightTheme, ThemeProps} from '../styles/theme';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {useTranslation} from 'react-i18next';

export const AppSettingsContext: React.Context<AppSettingsContextModel> =
  createContext<AppSettingsContextModel>({} as AppSettingsContextModel);

/**
 * This provider is global, it's responsible for storing the application settings such as the theme and the language
 *
 * @returns AppSettings Provider being used in the app.tsx file
 */
const AppSettingsProvider: React.FC<ReactChildrenProps> = ({children}) => {
  const {t, i18n} = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState<string>('en');
  const [theme, setTheme] = useState<ThemeProps>(lightTheme);

  const deviceTheme: ColorSchemeName = useColorScheme();

  useEffect(() => {
    const checkThemeOnAppStartUp = async (): Promise<
      ThemeProps | undefined
    > => {
      const checkIfAsyncStorageHasTheme: string | null =
        await AsyncStorage.getItem('theme');

      if (!checkIfAsyncStorageHasTheme) {
        // if error here then {} are needed
        if (deviceTheme === 'light') {
          setTheme(lightTheme);
        }
        if (deviceTheme === 'dark') {
          setTheme(darkTheme);
        }
        await AsyncStorage.setItem('theme', theme!.key);
        return theme;
      }
      return;
    };
    checkThemeOnAppStartUp();
    //
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

  const changeLanguage = async (lang: string) => {
    console.log(lang);
  };

  return (
    <AppSettingsContext.Provider
      value={{
        t,
        i18n,
        //states
        theme,
        language,
        changeLanguage,

        //functions
        changeTheme,
      }}>
      {children}
    </AppSettingsContext.Provider>
  );
};

export {AppSettingsProvider};
