import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {X_API_KEY, URL} from '../utils/env';

export const api = axios.create({
  baseURL: URL,
  headers: {
    'api-key': X_API_KEY,
  },
});

api.interceptors.request.use(
  (response: any) => {
    console.log(URL);
    return response;
  },
  (error: any) => {
    if (error.response.status === 401) {
      console.log('error 401');
    }
  },
);
