import {AxiosResponse} from 'axios';
import {api} from '..';
import {UserModel} from '../../models';
import {AUTH_PROFILE} from '../../utils/env';

const getProfileAxios = async (id: string): Promise<UserModel> => {
  try {
    const res: AxiosResponse<UserModel> = await api.get(
      `${AUTH_PROFILE}/${id}`,
    );
    return res.data;
  } catch (e) {
    throw new Error(
      'error while getting profile from server - get profile.ts failed',
    );
  }
};

export default getProfileAxios;
