import {AxiosResponse} from 'axios';
import {api} from '..';
import {TokenResponse} from '../../models';
import {PROFILE_UPDATE} from '../../../env';

/**
 *
 * @param name name being retrieved from the update form
 * @param password password being retrieved from the update form
 * @param passwordConfirmation password confirmation being retrieved from the update form
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const updateProfileAxios = async (
  user_id: string | null,
  name: string | null,
  password: string | null,
  passwordConfirmation: string | null,
): Promise<TokenResponse> => {
  try {
    const res: AxiosResponse<TokenResponse> = await api.post(PROFILE_UPDATE, {
      user_id,
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
