import {AxiosResponse} from 'axios';
import {api} from '..';
import {GetUserVote} from '../../models';
import {POST_CHECK_USER_VOTES} from '../../../env';

/**
 *
 * responsible for getting the value of the vote
 *
 * @param post_id the id of the post
 * @param user_id the id of the user
 * @returns a value, either 0 or 1, 0 being dislike and 1 being like
 */
const getUserVoteAxios = async (
  post_id: number,
  user_id: string | null,
): Promise<GetUserVote> => {
  try {
    const path: string = `${POST_CHECK_USER_VOTES}${post_id}/${user_id}`;
    const res: AxiosResponse<GetUserVote> = await api.get<GetUserVote>(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getUserVoteAxios;
