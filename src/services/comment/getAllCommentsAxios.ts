// import {AxiosResponse} from 'axios';
import {api} from '..';
import {COMMENT_GET_ALL} from '../../utils/env';

/**
 *
 * responsible for getting all of the comments
 *
 * @returns
 */
const getAllCommentsAxios = async (post_id: number) => {
  try {
    const path = `${COMMENT_GET_ALL}${post_id}`;
    const res = await api.get(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getAllCommentsAxios;
