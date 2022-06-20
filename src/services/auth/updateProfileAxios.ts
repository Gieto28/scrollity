import {AxiosResponse} from 'axios';
import {api} from '..';
import {TokenResponse} from '../../models';
import {AUTH_UPDATE_PROFILE} from '../../utils/env';

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
): Promise<TokenResponse> => {
  try {
    const res: AxiosResponse<TokenResponse, ErrorConstructor> =
      await api.post<TokenResponse>(AUTH_UPDATE_PROFILE, {
        name,
        password,
        passwordConfirmation,
      });
    return res.data;
  } catch (e) {
    throw new Error('Error while updating profile');
  }
};

export default updateProfileAxios;
