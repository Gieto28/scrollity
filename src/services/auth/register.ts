import {AxiosResponse} from 'axios';
import {tokenModel} from '../../models';
import {PATH_REGISTER} from '../../utils/env';
import {api} from '../api';

/**
 *
 * @param name name being retrieved from the form
 * @param email email being retrieved from the form
 * @param password password being retrieved from the form
 * @param passwordConfirmation password confirmation being retrieved from the form
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const register = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
): Promise<tokenModel> => {
  return await api
    .post<tokenModel>(PATH_REGISTER, {
      name,
      email,
      password,
      passwordConfirmation,
    })
    .then((res: AxiosResponse<tokenModel | any>) => res.data)
    .catch(() => 'Email already exists or missing/wrong data');
};

export default register;
