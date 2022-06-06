import {tokenModel} from '../../models';
import {PATH_REGISTER} from '../../utils/env';
import {api} from '../api';

/**
 *
 *
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
    .then((res: any) => res.data)
    .catch(() => new Error('error while trying to register'));
};

export default register;
