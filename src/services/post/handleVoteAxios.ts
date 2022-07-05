import {AxiosResponse} from 'axios';
import {api} from '..';
import {POST_VOTE} from '../../utils/env';

/**
 *
 * responsible for getting all of the posts based on the category currently selected
 *
 * @param category category chosen by user in the home screen, when page load, useEffect will dispatch and call the default category which is "Top"
 * @returns
 */
const handleVoteAxios = async (
  vote: number,
  post_id: number,
  user_id: string | null,
): Promise<any> => {
  try {
    const res: AxiosResponse = await api.post(POST_VOTE, {
      vote,
      post_id,
      user_id,
    });
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting profile from server - get profile.ts failed',
    );
    throw new Error(e.message);
  }
};

export default handleVoteAxios;
