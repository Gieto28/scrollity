import {AxiosResponse} from 'axios';
import {api} from '..';
import {AllCommentsResponse} from '../../models';
import {COMMENT_GET_ALL} from '../../../env';

/**
 *
 * @post_id Post id used to get all comments of that post
 * @returns comments model
 */
const getAllCommentsAxios = async (
  post_id: number,
): Promise<AllCommentsResponse> => {
  try {
    const path = `${COMMENT_GET_ALL}${post_id}`;
    const res: AxiosResponse<AllCommentsResponse> = await api.get(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getAllCommentsAxios;
