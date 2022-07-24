import React, {createContext, useEffect, useState} from 'react';
import {
  AuthContextModel,
  FormEditProfileModel,
  FormSignInModel,
  FormSignUpModel,
  JwtDecodedModel,
  NotificationModel,
  ReactChildrenProps,
  TokenResponse,
  UserModel,
} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {
  api,
  getProfileAxios,
  getUserNotifications,
  signInAxios,
  signUpAxios,
} from '../services';
import jwt_decode from 'jwt-decode';
import {updateProfileAxios} from '../services';
import OneSignal from 'react-native-onesignal';

export const AuthContext: React.Context<AuthContextModel> =
  createContext<AuthContextModel>({} as AuthContextModel);

/**
 *
 * First Provider of the app context it's responsible for the authentication of the application
 *
 * @returns AuthProvider being used in the file app.tsx
 */
const AuthProvider: React.FC<ReactChildrenProps> = ({children}) => {
  //
  const [user, setUser] = useState<UserModel | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notification, setNotifications] = useState<NotificationModel[]>([]);
  console.log(token);

  useEffect(() => {
    const loadStorageData = async () => {
      const storedToken: string | null = await AsyncStorage.getItem('token');
      const storedUser: string | null = await AsyncStorage.getItem('user');
      console.log('stored token', storedToken);
      console.log('stored user', storedUser);

      try {
        if (!storedToken || !storedUser) {
          console.log('stored token or stored user missing');
        }

        if (storedUser && storedToken) {
          const userObj = JSON.parse(storedUser);

          api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
          setToken(storedToken);
          const currentUser: UserModel = await getUser(userObj._id);
          setUser(currentUser);
          setUserId(currentUser._id);
          console.log('current user id', currentUser._id);
        }
      } catch (e: any) {
        console.log('error when loading', e);
        throw new Error(e.message);
      }

      setLoading(false);
    };

    loadStorageData();
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotifications = async () => {
    try {
      const storedId: string | null = await AsyncStorage.getItem('userId');
      const res: NotificationModel[] = await getUserNotifications(storedId);
      console.log('notification answer', res);
      setNotifications(res);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const signIn = async (data: FormSignInModel): Promise<void> => {
    const {email, password} = data;
    try {
      const res: TokenResponse = await signInAxios(email, password);
      if (!res.token) {
        throw new Error('Error while signing in, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(res.token);

      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;
      await AsyncStorage.setItem('token', res.token);

      const currentUser: UserModel = await getUser(decoded._id.toString());
      console.log('current user', currentUser);

      OneSignal.setExternalUserId(currentUser._id.toString());
      await AsyncStorage.setItem('userId', currentUser._id.toString());
      await AsyncStorage.setItem('user', JSON.stringify(currentUser));
      setToken(res.token);
      setUser(currentUser);
      setUserId(currentUser._id);
      getNotifications();
      console.log('............................', currentUser, res.token);
    } catch (e: any) {
      console.log(e);
    }
  };

  const signUp = async (data: FormSignUpModel): Promise<void> => {
    const {name, email, password, passwordConfirmation} = data;

    try {
      const res: TokenResponse = await signUpAxios(
        name,
        email,
        password,
        passwordConfirmation,
      );

      if (!res.token) {
        throw new Error('Error while signing up, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(res.token);
      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;

      await AsyncStorage.setItem('token', res.token);
      const currentUser = await getUser(decoded._id.toString());

      OneSignal.setExternalUserId(currentUser._id.toString());
      await AsyncStorage.setItem('userId', currentUser._id.toString());
      await AsyncStorage.setItem('user', JSON.stringify(currentUser));
      setToken(res.token);
      setUser(currentUser);
      setUserId(currentUser._id);
      getNotifications();
    } catch (e) {
      throw new Error('Found an error while signing up');
    }
  };

  const updateProfile = async (data: FormEditProfileModel): Promise<void> => {
    let {name, password, passwordConfirmation} = data;

    if (name === undefined) {
      name = null;
    }
    if (password === undefined) {
      password = null;
    }
    if (passwordConfirmation === undefined) {
      passwordConfirmation = null;
    }

    try {
      const res: TokenResponse = await updateProfileAxios(
        userId,
        name,
        password,
        passwordConfirmation,
      );

      if (!res.token) {
        throw new Error('error while updating profile, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(res.token);

      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;
      await AsyncStorage.setItem('token', res.token);

      const currentUser = await getUser(decoded._id.toString());

      await AsyncStorage.setItem('user', JSON.stringify(currentUser));
      setToken(res.token);
      setUser(currentUser);
      setUserId(currentUser._id);
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const getUser = async (id: string): Promise<UserModel> => {
    try {
      const currentUser: UserModel = await getProfileAxios(id);
      return currentUser;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  const signOut = async (): Promise<void> => {
    setUser(null);
    setUserId(null);
    setToken(null);
    OneSignal.removeExternalUserId();
    await AsyncStorage.multiRemove(['token', 'userId', 'user']);
  };

  return (
    <AuthContext.Provider
      value={{
        // states
        isSignedIn: !!user,
        user,
        userId,
        loading,
        token,
        notification,

        // functions
        signIn,
        signUp,
        updateProfile,
        getUser,
        signOut,
        getNotifications,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};
