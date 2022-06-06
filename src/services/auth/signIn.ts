import {tokenModel} from '../../models';
import {PATH_LOGIN} from '../../utils/env';
import {api} from '../api';

/**
 * Use this when you want to use the email and password to log in the user
 *
 * @param email email being retrieved from the login screen
 * @param password password being retrieved from the login screen
 * @returns res.data which should be a very long token
 */
const signIn = async (email: string, password: string): Promise<tokenModel> => {
  return await api
    .post<tokenModel>(PATH_LOGIN, {email, password})
    .then((res: any) => res.data)
    .catch(() => 'Bad Credentials');
};

export default signIn;
