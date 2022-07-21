import {AxiosResponse} from 'axios';
import {api} from '..';
import {NOTIFICATIONS_HIGHEST_VOTED} from '../../../env';

/**
 *
 * @param user_id the user id in async storage or context
 * @param option the option of what we want to retrieve, either posts or likes
 * @returns
 */
const getHighestPostsAxios = async (user_id: string | null): Promise<any> => {
  try {
    const res: AxiosResponse<any> = await api.get<any>(
      `${NOTIFICATIONS_HIGHEST_VOTED}${user_id}`,
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getHighestPostsAxios;
