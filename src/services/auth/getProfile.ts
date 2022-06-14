import {AxiosResponse} from 'axios';
import {api} from '..';
import {PATH_PROFILE} from '../../utils/env-EXAMPLE';

const getProfile = async (token: string | null) => {
  console.log('token', token);

  if (!token) {
    throw new Error('missing token in get profile');
  }

  return await api
    .get(PATH_PROFILE)
    .then((res: AxiosResponse) => res.data)
    .catch(
      () => 'error while getting profile from server - get profile.ts failed',
    );
};

export default getProfile;
