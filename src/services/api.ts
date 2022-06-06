import axios, {AxiosRequestConfig} from 'axios';
import {AsyncStorage} from 'react-native';

const apiKey = 'b459e351-e1e6-412d-b59b-653cc5eec642';

export const api = axios.create({
  baseURL: 'http://localhost:3003',
});

api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const token = AsyncStorage.getItem('token');

  if (token) {
    config.headers = {Authorization: `Bearer ${token}`};
  }

  return config;
});
