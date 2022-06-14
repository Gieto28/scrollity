import {AxiosResponse} from 'axios';
import {api} from '..';
import {TokenModel} from '../../models';
import {PATH_UPDATE_PROFILE} from '../../utils/env';

/**
 *
 * @param name name being retrieved from the update form
 * @param password password being retrieved from the update form
 * @param passwordConfirmation password confirmation being retrieved from the update form
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const updateProfileAxios = async (
  name: string | null,
  password: string | null,
  passwordConfirmation: string | null,
): Promise<TokenModel> => {
  return await api
    .post<TokenModel>(PATH_UPDATE_PROFILE, {
      name,
      password,
      passwordConfirmation,
    })
    .then((res: AxiosResponse<TokenModel | any>) => res.data)
    .catch(() => 'Error while updating profile');
};

export default updateProfileAxios;
