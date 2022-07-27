import {AxiosResponse} from 'axios';
import {api} from '..';
import {PROFILE_GET_POSTS} from '../../../env';
import {PostModel, ProfilePostModel} from '../../models';

/**
 *
 * @param user_id the user id in async storage or context
 * @param option the option of what we want to retrieve, either posts or likes
 * @returns
 */
const getProfilePostsAxios = async (
  user_id: string | null,
  option: string,
): Promise<ProfilePostModel | PostModel> => {
  try {
    const res: AxiosResponse<ProfilePostModel | PostModel> = await api.get(
      `${PROFILE_GET_POSTS}${user_id}/${option}`,
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getProfilePostsAxios;
