import {AxiosResponse} from 'axios';
import {api} from '..';
import {SuccessResponse} from '../../models';
import {COMMENT_VOTE} from '../../../env';

/**
 *
 * @param vote this data can only be 0 or 1, 0 is if the user down voted the comment and 1 is uf the user up voted the comment
 * @param post_id id of the post being voted on
 * @param user_id id of the user that is voting on the post
 * @returns either success - simple message saying success or error
 */
const handleVoteCommentAxios = async (
  vote: number,
  comment_id: number,
  user_id: string | null,
): Promise<SuccessResponse | undefined> => {
  try {
    const res: AxiosResponse<SuccessResponse> = await api.post<SuccessResponse>(
      COMMENT_VOTE,
      {
        vote,
        comment_id,
        user_id,
      },
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default handleVoteCommentAxios;
