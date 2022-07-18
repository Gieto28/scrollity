// import {AxiosResponse} from 'axios';
import {AxiosResponse} from 'axios';
import {api} from '..';
import {AllCommentsResponse} from '../../models';
import {COMMENT_GET_ALL} from '../../utils/env';

/**
 *
 * responsible for getting all of the comments
 *
 * @returns
 */
const getAllCommentsAxios = async (
  post_id: number,
): Promise<AllCommentsResponse> => {
  try {
    const path = `${COMMENT_GET_ALL}${post_id}`;
    const res: AxiosResponse<AllCommentsResponse> =
      await api.get<AllCommentsResponse>(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getAllCommentsAxios;
