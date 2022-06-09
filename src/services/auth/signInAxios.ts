import {AxiosResponse} from 'axios';
import {TokenModel} from '../../models';
import {PATH_LOGIN} from '../../utils/env';
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
  return await api
    .post<TokenModel>(PATH_LOGIN, {email, password})
    .then((res: AxiosResponse<TokenModel | any>) => res.data)
    .catch(() => 'Bad Credentials');
};

export default signInAxios;
