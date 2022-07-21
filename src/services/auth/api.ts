import axios, {AxiosInstance} from 'axios';
import {X_API_KEY, URL} from '../../../env';

// creating axios url and headers
const api: AxiosInstance = axios.create({
  baseURL: URL,
  headers: {
    'api-key': X_API_KEY,
  },
});

export default api;
