import {AxiosResponse} from 'axios';
import {TokenModel} from '../../models';
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
): Promise<TokenModel> => {
  try {
    const res: AxiosResponse<TokenModel, ErrorConstructor> =
      await api.post<TokenModel>(AUTH_LOGIN, {email, password});
    return res.data;
  } catch (e) {
    throw new Error('Bad Credentials');
  }
};

export default signInAxios;
