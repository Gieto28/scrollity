import {AxiosResponse} from 'axios';
import {api} from '..';
import {PROFILE_GET_POSTS} from '../../utils/env';

/**
 *
 * @param user_id the user id in async storage or context
 * @param option the option of what we want to retrieve, either posts or likes
 * @returns
 */
const getProfilePostsAxios = async (
  user_id: string | null,
  option: string,
): Promise<any> => {
  try {
    const res: AxiosResponse<any> = await api.get<any>(
      `${PROFILE_GET_POSTS}${user_id}/${option}`,
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getProfilePostsAxios;
