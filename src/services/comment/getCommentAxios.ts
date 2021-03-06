import {AxiosResponse} from 'axios';
import {api} from '..';
import {CommentModel} from '../../models';
import {COMMENT_GET} from '../../../env';

/**
 *
 * responsible for getting one single post based on the id
 *
 * @param id the id of the post
 * @returns a post
 */
const getCommentAxios = async (id: number): Promise<CommentModel> => {
  try {
    const path: string = `${COMMENT_GET}${id}`;
    const res: AxiosResponse<CommentModel> = await api.get<CommentModel>(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getCommentAxios;
