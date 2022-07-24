import {AxiosResponse} from 'axios';
import {api} from '..';
import {SuccessResponse} from '../../models';
import {PROFILE_UPDATE_IMAGE} from '../../../env';

/**
 *
 * @param name name being retrieved from the update form
 * @param password password being retrieved from the update form
 * @param passwordConfirmation password confirmation being retrieved from the update form
 * @returns res.data which should be a very long token with the user information or if error should catch and show it on the screen
 */
const updateProfileImageAxios = async (
  user_id: string | null,
  media_id: string | null,
): Promise<SuccessResponse> => {
  try {
    const res: AxiosResponse<SuccessResponse> = await api.post<SuccessResponse>(
      PROFILE_UPDATE_IMAGE,
      {
        user_id,
        media_id,
      },
    );
    return res.data;
  } catch (e) {
    throw new Error('Error while updating profile');
  }
};

export default updateProfileImageAxios;
