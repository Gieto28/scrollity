// import {AxiosResponse} from 'axios';
import {AxiosResponse} from 'axios';
import {api} from '..';
import {GetUserVote} from '../../models';
import {COMMENT_CHECK_USER_VOTES} from '../../../env';

/**
 *
 * responsible for getting the value of the vote
 *
 * @param comment_id the id of the post
 * @param user_id the id of the user
 * @returns a value, either 0 or 1, 0 being dislike and 1 being like
 */
const getUserVoteCommentAxios = async (
  comment_id: number,
  user_id: string | null,
): Promise<GetUserVote> => {
  try {
    const path: string = `${COMMENT_CHECK_USER_VOTES}${comment_id}/${user_id}`;
    const res: AxiosResponse<GetUserVote> = await api.post<GetUserVote>(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getUserVoteCommentAxios;
