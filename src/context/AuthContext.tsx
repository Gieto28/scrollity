import React, {createContext, useEffect, useState} from 'react';
import {
  AuthContextModel,
  FormEditProfileModel,
  FormSignInModel,
  FormSignUpModel,
  JwtDecodedModel,
  ReactChildrenProps,
  TokenResponse,
  UserModel,
} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import {api, getProfileAxios, signInAxios, signUpAxios} from '../services';
import jwt_decode from 'jwt-decode';
import {updateProfileAxios} from '../services';

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

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken: string | null = await AsyncStorage.getItem('token');
        const storedUser: string | null = await AsyncStorage.getItem('user');

        if (storedUser && storedToken) {
          const userObj = JSON.parse(storedUser);

          api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
          setToken(storedToken);
          const currentUser: UserModel = await getUser(userObj._id);
          setUser(currentUser);
          setUserId(currentUser._id);
        }
      } catch (e: any) {
        console.log('error while loading storage data in Auth Context.tsx');
        throw new Error(e.message);
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (data: FormSignInModel): Promise<void> => {
    const {email, password} = data;
    try {
      const res: TokenResponse = await signInAxios(email, password);
      if (!res.token) {
        throw new Error('Error while signing in, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(res.token);
      console.log(res.token);

      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;
      await AsyncStorage.setItem('token', res.token);

      const currentUser: UserModel = await getUser(decoded._id.toString());

      await AsyncStorage.setItem('userId', currentUser._id.toString());
      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
      setToken(res.token);
      setUser(currentUser);
      setUserId(currentUser._id);

      console.log('sign in successful - file auth.tsx');
    } catch (e: any) {
      throw new Error(e.message);
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
      await AsyncStorage.setItem('userId', currentUser._id.toString());
      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
      setToken(res.token);
      setUser(currentUser);
      setUserId(currentUser._id);
      //
      console.log('sign up successful - file auth.tsx');
      //
    } catch (e) {
      throw new Error('Token exists but found an error while signing up');
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
        name,
        password,
        passwordConfirmation,
      );

      console.log('res from update profile, file auth context', res);

      if (!res.token) {
        throw new Error('error while updating profile, missing token');
      }

      const decoded: JwtDecodedModel = await jwt_decode(res.token);

      api.defaults.headers.common.Authorization = `Bearer ${res.token}`;
      await AsyncStorage.setItem('token', res.token);

      const currentUser = await getUser(decoded._id.toString());

      await AsyncStorage.setItem('currentUser', JSON.stringify(currentUser));
      setToken(res.token);
      setUser(currentUser);
      setUserId(currentUser._id);
    } catch (error) {
      throw new Error('error while updating profile on file app context');
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

        // functions
        signIn,
        signUp,
        updateProfile,
        getUser,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider};
