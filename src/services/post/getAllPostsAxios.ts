import {AxiosResponse} from 'axios';
import {api} from '..';
import {PostResponse} from '../../models';
import {PATH_GET_ALL_POSTS} from '../../utils/env';

const getAllPosts = async (category: string): Promise<any> => {
  try {
    const path: string = `${PATH_GET_ALL_POSTS}${category}`;
    const res: AxiosResponse = await api.get(path);
    return res.data;
  } catch (e: any) {
    console.log(
      'error while getting profile from server - get profile.ts failed',
    );
    throw new Error(e.message);
  }
};

export default getAllPosts;
