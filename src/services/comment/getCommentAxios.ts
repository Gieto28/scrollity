import {AxiosResponse} from 'axios';
import {api} from '..';
import {COMMENT_GET} from '../../utils/env';

/**
 *
 * responsible for getting one single post based on the id
 *
 * @param id the id of the post
 * @returns a post
 */
const getPostAxios = async (id: number): Promise<any> => {
  try {
    const path: string = `${COMMENT_GET}${id}`;
    const res: AxiosResponse<any> = await api.get<any>(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getPostAxios;
