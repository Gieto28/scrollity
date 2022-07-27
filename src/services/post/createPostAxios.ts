import {AxiosResponse} from 'axios';
import {api} from '..';
import {POST_CREATE} from '../../../env';
import {SuccessResponse} from '../../models';

/**
 * After using image native picker to get the image information I call this method and send all of the form information through it.To be able to get the image on the node server I have to send content-type: multipart/form-data through the headers and send the information through a new FormData object with the following keys and values:
 *
 * @param user_id user_id being retrieved from the form
 * @param title post title being retrieved from the form
 * @param description post description being retrieved from the form
 * @param media_id media URI being retrieved from the form
 * @param mediaType media type being retrieved from the form
 * @param category category being retrieved from the form
 * @returns res.data which should be upload: success or if error should catch and show error message
 */
const createPostAxios = async (
  user_id: string | null,
  title: string,
  description: string,
  media_id: string | null,
  category: string,
): Promise<SuccessResponse> => {
  if (!user_id) {
    throw new Error('user null');
  }

  try {
    const res: AxiosResponse<SuccessResponse> = await api.post(POST_CREATE, {
      user_id,
      title,
      description,
      media_id,
      category,
    });
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default createPostAxios;
