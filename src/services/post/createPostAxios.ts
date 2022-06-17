import {AxiosResponse} from 'axios';
import {api} from '..';
import {PATH_CREATE_POST} from '../../utils/env';
import {v4 as uuid} from 'uuid';
import {MediaPostModel} from '../../models';

const createPostAxios = async (
  user_id: string | null,
  title: string,
  description: string | null,
  mediaUri: string | null,
  mediaType: string | null,
  category: string,
) => {
  const formData = new FormData();
  const uniqueId = uuid();
  const mediaName = mediaUri
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
    const res: AxiosResponse<{success: string}, ErrorConstructor> =
      await api.post(PATH_CREATE_POST, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    return res.data;
  } catch (e) {
    throw new Error('error while sending post dara to back end');
  }
};

export default createPostAxios;
