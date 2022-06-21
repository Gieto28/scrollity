import {AxiosResponse} from 'axios';
import {api} from '..';
import {PATH_GET_ALL_POSTS} from '../../utils/env';

/**
 *
 * responsible for getting all of the posts based on the category currently selected
 *
 * @param category category chosen by user in the home screen, when page load, useEffect will dispatch and call the default category which is "Top"
 * @returns
 */
const getAllPosts = async (category: string): Promise<any> => {
  try {
    const path: string = `${PATH_GET_ALL_POSTS}${category}`;
    const res: AxiosResponse = await api.get(path);
    console.log(res.data.data);
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting profile from server - get profile.ts failed',
    );
    throw new Error(e.message);
  }
};

export default getAllPosts;
