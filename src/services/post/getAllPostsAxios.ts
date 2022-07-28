import {AxiosResponse} from 'axios';
import {api} from '..';
import {AllPostsResponse} from '../../models';
import {POST_GET_ALL} from '../../../env';

/**
 *
 * responsible for getting all of the posts based on the category currently selected
 * @param limit limit of posts to get
 * @param skip skips an amount of posts
 * @param category category chosen by user in the home screen, when page load, useEffect will dispatch and call the default category which is "Top"
 * @returns
 */
const getAllPostsAxios = async (
  category: string,
  limit: number,
  skip: number,
): Promise<AllPostsResponse> => {
  try {
    const path: string = `${POST_GET_ALL}${category}/${limit}/${skip}`;
    const res: AxiosResponse<AllPostsResponse> = await api.get(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getAllPostsAxios;
