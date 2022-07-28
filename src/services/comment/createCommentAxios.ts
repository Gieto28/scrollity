import {AxiosResponse} from 'axios';
import {api} from '..';
import {COMMENT_CREATE} from '../../../env';
import {SuccessResponse} from '../../models';

/**
 *
 * @param user_id user id of the user who created the comment
 * @param post_id id of the post it belongs to
 * @param comment comment being retrieved from the form
 * @returns success response
 */
const createCommentAxios = async (
  user_id: string | undefined,
  post_id: number,
  comment: string,
): Promise<SuccessResponse> => {
  if (!user_id) {
    throw new Error('user null');
  }
  try {
    const res: AxiosResponse<SuccessResponse> = await api.post(COMMENT_CREATE, {
      user_id,
      post_id,
      comment,
    });
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default createCommentAxios;
