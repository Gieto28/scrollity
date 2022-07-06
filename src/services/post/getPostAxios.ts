import {AxiosResponse} from 'axios';
import {api} from '..';
import {PostModel} from '../../models';
import {POST_GET} from '../../utils/env';

/**
 *
 * responsible for getting one single post based on the id
 *
 * @param id the id of the post
 * @returns a post
 */
const getPost = async (id: number): Promise<PostModel> => {
  try {
    const path: string = `${POST_GET}${id}`;
    const res: AxiosResponse<PostModel> = await api.get<PostModel>(path);
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting post from server - get post axios.ts failed',
    );
    throw new Error(e.message);
  }
};

export default getPost;
