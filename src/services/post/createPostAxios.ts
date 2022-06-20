import {AxiosResponse} from 'axios';
import {api} from '..';
import {PATH_CREATE_POST} from '../../utils/env';
import {v4 as uuid} from 'uuid';
import {CreatePostResponse, MediaPostModel} from '../../models';

/**
 * After using image native picker to get the image information I call this method and send all of the form information through it.To be able to get the image on the node server I have to send content-type: multipart/form-data through the headers and send the information through a new FormData object with the following keys and values:
 *
 * @param user_id user_id being retrieved from the form
 * @param title post title being retrieved from the form
 * @param description post description being retrieved from the form
 * @param mediaUri media URI being retrieved from the form
 * @param mediaType media type being retrieved from the form
 * @param category category being retrieved from the form
 * @returns res.data which should be upload: success or if error should catch and show error message
 */
const createPostAxios = async (
  user_id: string | null,
  title: string,
  description: string | null,
  mediaUri: string | null,
  mediaType: string | null,
  category: string,
): Promise<CreatePostResponse> => {
  const formData: FormData = new FormData();
  const uniqueId: string = uuid();
  const mediaName: string | null = mediaUri
    ? `${uniqueId}.${mediaUri.split('.').pop()}`
    : null;

  const media: MediaPostModel = {
    uri: mediaUri,
    type: mediaType,
    name: mediaName,
  };

  formData.append('media', media);
  formData.append('fileType', mediaType);
  formData.append('fileName', mediaName);
  formData.append('user_id', user_id);
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);

  try {
    const res: AxiosResponse<CreatePostResponse, ErrorConstructor> =
      await api.post<CreatePostResponse>(PATH_CREATE_POST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    return res.data;
  } catch (e: any) {
    console.log('error while sending post to back end');
    throw new Error(e.message);
  }
};

export default createPostAxios;
