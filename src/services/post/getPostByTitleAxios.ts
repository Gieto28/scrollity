import {AxiosResponse} from 'axios';
import {api} from '..';
import {PostModel} from '../../models';
import {POST_GET_BY_TITLE} from '../../../env';

/**
 *
 * responsible for getting one single post based on the id
 *
 * @param id the id of the post
 * @returns a post
 */
const getPostByTitleAxios = async (title: string): Promise<PostModel[]> => {
  try {
    const path: string = `${POST_GET_BY_TITLE}${title}`;
    const res: AxiosResponse<PostModel[]> = await api.get<PostModel[]>(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getPostByTitleAxios;
