import {AxiosResponse} from 'axios';
import {api} from '..';
import {COMMENT_CREATE} from '../../utils/env';
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
const createCommentAxios = async (
  user_id: string | undefined,
  post_id: number,
  comment: string,
): Promise<SuccessResponse> => {
  if (!user_id) {
    throw new Error('user null');
  }
  try {
    const res: AxiosResponse<SuccessResponse> = await api.post<SuccessResponse>(
      COMMENT_CREATE,
      {
        user_id,
        post_id,
        comment,
      },
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default createCommentAxios;
