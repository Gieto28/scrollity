import React, {createContext, useEffect, useState} from 'react';
import {
  AuthContextModel,
  FormEditProfileModel,
  FormSignInModel,
  FormSignUpModel,
  JwtDecodedModel,
  ReactChildrenProps,
  TokenModel,
} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {api, signInAxios, signUpAxios} from '../services';
import jwt_decode from 'jwt-decode';
import updateProfileAxios from '../services/auth/updateProfile';

export const AuthContext: React.Context<AuthContextModel> =
  createContext<AuthContextModel>({} as AuthContextModel);

const AuthProvider: React.FC<ReactChildrenProps> = ({children}) => {
  //
  const [user, setUser] = useState<JwtDecodedModel | any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        const storedUserId = await AsyncStorage.getItem('userId');

        if (storedUser && storedToken) {
          api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setUserId(storedUserId);
        }
      } catch (error) {
        throw new Error('error while loading storage data in Auth Context.tsx');
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (data: FormSignInModel): Promise<void> => {
    const {email, password} = data;
    try {
      const data: TokenModel = await signInAxios(email, password);
      if (!data.token) {
        throw new Error('Error while signing in, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(data.token);

      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', decoded._id.toString());
      await AsyncStorage.setItem('user', JSON.stringify(decoded));
      setToken(data.token);
      setUser(decoded);
      setUserId(decoded._id.toString());

      console.log('sign in successful - file auth.tsx');
    } catch (e) {
      console.error(e);
      throw new Error('Token exists but found an error while signing in');
    }
  };

  const signUp = async (data: FormSignUpModel): Promise<void> => {
    const {name, email, password, passwordConfirmation} = data;

    try {
      const data: TokenModel = await signUpAxios(
        name,
        email,
        password,
        passwordConfirmation,
      );

      if (!data.token) {
        throw new Error('Error while signing up, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', decoded._id.toString());
      await AsyncStorage.setItem('user', JSON.stringify(decoded));
      setToken(data.token);
      setUser(decoded);
      setUserId(decoded._id.toString());
      //
      console.log('sign up successful - file auth.tsx');
      //
    } catch (e) {
      throw new Error('Token exists but found an error while signing up');
    }
  };

  const updateProfile = async (data: FormEditProfileModel): Promise<void> => {
    let {name, password, passwordConfirmation} = data;

    if (name === undefined) name = null;
    if (password === undefined) password = null;
    if (passwordConfirmation === undefined) passwordConfirmation = null;

    try {
      const data: TokenModel = await updateProfileAxios(
        name,
        password,
        passwordConfirmation,
      );

      console.log('data from update profile, file auth context', data);

      if (!data.token) {
        throw new Error('error while updating profile, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('userId', decoded._id.toString());
      await AsyncStorage.setItem('user', JSON.stringify(decoded));
      setToken(data.token);
      setUser(decoded);
      setUserId(decoded._id.toString());
    } catch (error) {
      throw new Error('error while updating profile on file app context');
    }
  };

  const signOut = async () => {
    setUser(null);
    setUserId(null);
    setToken(null);

    await AsyncStorage.multiRemove(['token', 'userId', 'user']);
  };

  return (
    <AuthContext.Provider
      value={{
        // states
        isSignedIn: !!user,
        user,
        setUser,
        userId,
        loading,
        token,

        // functions
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};
