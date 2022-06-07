import {AxiosResponse} from 'axios';
import {tokenModel} from '../../models';
import {PATH_LOGIN} from '../../utils/env';
import {api} from '../api';

/**
 * Use this when you want to use the email and password to log in the user
 *
 * @param email email being retrieved from the login screen
 * @param password password being retrieved from the login screen
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const signIn = async (email: string, password: string): Promise<tokenModel> => {
  return await api
    .post<tokenModel>(PATH_LOGIN, {email, password})
    .then((res: AxiosResponse<tokenModel | any>) => res.data)
    .catch(() => 'Bad Credentials');
};

export default signIn;
