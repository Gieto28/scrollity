import React, {createContext, useEffect, useState} from 'react';
import {
  AuthContextModel,
  FormSignInModel,
  FormSignUpModel,
  JwtDecodedModel,
  ReactChildrenProps,
  TokenModel,
} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {api, signInAxios, signUpAxios} from '../services';
import jwt_decode from 'jwt-decode';

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
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      const storedUserId = await AsyncStorage.getItem('userId');

      if (storedUser && storedToken) {
        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setUserId(storedUserId);
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

  const signUp = async (data: FormSignUpModel) => {
    const {name, email, password, passwordConfirmation} = data;

    try {
      const data = await signUpAxios(
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

  const signOut = async () => {
    await AsyncStorage.multiRemove(['token', 'userId', 'user']);
    setUser(null);
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

        // functions
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};
