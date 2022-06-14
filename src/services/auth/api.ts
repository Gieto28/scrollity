import axios from 'axios';
import {X_API_KEY, URL} from '../../utils/env';

// creating axios url and headers
const api = axios.create({
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

export default api;
