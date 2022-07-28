import React, {createContext, useEffect, useState} from 'react';
import {
  AppContextModel,
  NotificationModel,
  ReactChildrenProps,
} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {darkTheme, lightTheme, ThemeProps} from '../styles/theme';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {useTranslation} from 'react-i18next';
import {getUserNotifications} from '../services';

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
  const [notification, setNotifications] = useState<NotificationModel[]>([]);
  const [loadingNotifications, setLoadingNotifications] =
    useState<boolean>(false);

  useEffect(() => {
    const checkAppConfiguration = async (): Promise<ThemeProps | undefined> => {
      const checkIfAsyncStorageHasTheme: string | null =
        await AsyncStorage.getItem('theme');

      if (!checkIfAsyncStorageHasTheme) {
        deviceTheme === 'light' && setTheme(lightTheme);
        deviceTheme === 'dark' && setTheme(darkTheme);
        deviceTheme === undefined || null ? setTheme(darkTheme) : null;
        await AsyncStorage.setItem('theme', theme.key);
        return theme;
      }

      if (checkIfAsyncStorageHasTheme) {
        checkIfAsyncStorageHasTheme === 'light' && setTheme(lightTheme);
        checkIfAsyncStorageHasTheme === 'dark' && setTheme(darkTheme);
      }

      const storedLang: string | null = await AsyncStorage.getItem('lang');

      switch (storedLang) {
        case 'en':
          setEn();
          break;

        case 'pt':
          setPt();
          break;

        default:
          setEn();
          break;
      }
    };

    getNotifications();
    checkAppConfiguration();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const storedId: string | null = await AsyncStorage.getItem('userId');
      const res: NotificationModel[] = await getUserNotifications(storedId);
      setNotifications(res);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setLoadingNotifications(false);
  };

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
        setEn();
        break;

      case 'en':
        setPt();
        break;
    }
  };

  const setEn = async () => {
    i18n.changeLanguage('en');
    await AsyncStorage.setItem('lang', 'en');
  };

  const setPt = async () => {
    i18n.changeLanguage('pt');
    await AsyncStorage.setItem('lang', 'pt');
  };

  return (
    <AppContext.Provider
      value={{
        //states
        theme,
        changeLang,
        loadingNotifications,
        notification,

        //functions
        changeTheme,
        getNotifications,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppProvider};
