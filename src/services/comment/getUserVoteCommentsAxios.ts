// import {AxiosResponse} from 'axios';
import {AxiosResponse} from 'axios';
import {api} from '..';
import {GetUserVote} from '../../models';
import {COMMENT_CHECK_USER_VOTES} from '../../../env';

/**
 *
 * responsible for getting the value of the vote
 *
 * @param comment_id the id of the comment
 * @param user_id the id of the user
 * @returns the user vote
 */
const getUserVoteCommentAxios = async (
  comment_id: number,
  user_id: string | null,
): Promise<GetUserVote> => {
  try {
    const path: string = `${COMMENT_CHECK_USER_VOTES}${comment_id}/${user_id}`;
    const res: AxiosResponse<GetUserVote> = await api.post(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getUserVoteCommentAxios;
