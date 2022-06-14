import {AxiosResponse} from 'axios';
import {api} from '..';
import {PATH_PROFILE} from '../../utils/env-EXAMPLE';

const getProfile = async (token: string) => {
  console.log('token', token);

  return await api
    .get(PATH_PROFILE, {headers: {Authorization: `Bearer ${token}`}})
    .then((res: AxiosResponse) => res.data)
    .catch(
      () => 'error while getting profile from server - get profile.ts failed',
    );
};

export default getProfile;
