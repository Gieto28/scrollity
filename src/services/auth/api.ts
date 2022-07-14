import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {X_API_KEY, URL} from '../../utils/env';

// creating axios url and headers
const api: AxiosInstance = axios.create({
  baseURL: URL,
  headers: {
    'api-key': X_API_KEY,
  },
});

api.interceptors.request.use(
  (res: AxiosRequestConfig) => {
    return res;
  },
  error => {
    if (error.response.status === 401) {
      throw new Error(error.response.message);
    }
  },
);

export default api;
