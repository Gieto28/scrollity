import {AxiosResponse} from 'axios';
import {api} from '..';
import {AUTH_PROFILE} from '../../utils/env';

const getProfileAxios = async () => {
  try {
    const res = await api.get(AUTH_PROFILE);
    return res.data;
  } catch (e) {
    throw new Error(
      'error while getting profile from server - get profile.ts failed',
    );
  }
};

export default getProfileAxios;
