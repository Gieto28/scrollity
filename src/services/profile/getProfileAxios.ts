import {AxiosResponse} from 'axios';
import {api} from '..';
import {UserModel} from '../../models';
import {PROFILE_GET} from '../../utils/env';

/**
 *
 * @param id id used to retrieve the desired profile
 * @returns a profile
 */
const getProfileAxios = async (id: string): Promise<UserModel> => {
  try {
    const res: AxiosResponse<UserModel> = await api.get(`${PROFILE_GET}${id}`);
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting profile from server - get profile axios.ts failed',
    );
    throw new Error(e.message);
  }
};

export default getProfileAxios;
