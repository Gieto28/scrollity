import {AxiosResponse} from 'axios';
import {api} from '..';
import {PostModel} from '../../models';
import {POST_GET} from '../../../env';

/**
 *
 * responsible for getting one single post based on the id
 *
 * @param id the id of the post
 * @returns a post
 */
const getPostAxios = async (id: number): Promise<PostModel> => {
  try {
    const path: string = `${POST_GET}${id}`;
    const res: AxiosResponse<PostModel> = await api.get(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getPostAxios;
