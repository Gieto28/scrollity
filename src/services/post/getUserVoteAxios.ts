import {AxiosResponse} from 'axios';
import {api} from '..';
import {POST_CHECK_USER_VOTES} from '../../utils/env';

/**
 *
 * responsible for getting the value of the vote
 *
 * @param post_id the id of the post
 * @param user_id the id of the user
 * @returns a value, either 0 or 1, 0 being dislike and 1 being like
 */
const getUserVote = async (post_id: number, user_id: string | null) => {
  try {
    const path: string = `${POST_CHECK_USER_VOTES}${post_id}/${user_id}`;
    const res = await api.get(path);
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting post from server - get post axios.ts failed',
    );
    throw new Error(e.message);
  }
};

export default getUserVote;
