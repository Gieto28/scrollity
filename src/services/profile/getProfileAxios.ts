import {AxiosResponse} from 'axios';
import {api} from '..';
import {UserModel} from '../../models';
import {PROFILE_GET} from '../../utils/env';

const getProfileAxios = async (id: string): Promise<UserModel> => {
  try {
    const res: AxiosResponse<UserModel> = await api.get(`${PROFILE_GET}/${id}`);
    return res.data;
  } catch (e) {
    throw new Error(
      'error while getting profile from server - get profile.ts failed',
    );
  }
};

export default getProfileAxios;
