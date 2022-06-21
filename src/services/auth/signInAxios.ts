import {AxiosResponse} from 'axios';
import {TokenResponse} from '../../models';
import {AUTH_LOGIN} from '../../utils/env';
import {api} from '..';

/**
 * Use this when you want to use the email and password to log in the user
 *
 * @param email email being retrieved from the login screen
 * @param password password being retrieved from the login screen
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const signInAxios = async (
  email: string,
  password: string,
): Promise<TokenResponse> => {
  try {
    const res: AxiosResponse<TokenResponse, ErrorConstructor> =
      await api.post<TokenResponse>(AUTH_LOGIN, {email, password});
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default signInAxios;
