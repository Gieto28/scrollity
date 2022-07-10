import {AxiosResponse} from 'axios';
import {api} from '..';
import {AllPostsResponse} from '../../models';
import {POST_GET_ALL} from '../../utils/env';

/**
 *
 * responsible for getting all of the posts based on the category currently selected
 *
 * @param category category chosen by user in the home screen, when page load, useEffect will dispatch and call the default category which is "Top"
 * @returns
 */
const getAllPosts = async (category: string): Promise<AllPostsResponse> => {
  try {
    const path: string = `${POST_GET_ALL}${category}`;
    const res: AxiosResponse<AllPostsResponse> =
      await api.get<AllPostsResponse>(path);
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting profile from server - get profile.ts failed',
    );
    throw new Error(e.message);
  }
};

export default getAllPosts;
