import {AxiosResponse} from 'axios';
import {api} from '..';
import {FILE_UPLOAD} from '../../../env';
import {SuccessResponse, MediaPostModel} from '../../models';

/**
 *
 * @param mediaUri media URI being retrieved from the form
 * @param mediaId media ID being retrieved from the create post screen
 * @param mediaType media type being retrieved from the form
 * @returns res.data which should be upload: success or if error should catch and show error message
 */
const uploadFileAxios = async (
  mediaUri: string,
  media_id: string,
  mediaType: string,
): Promise<SuccessResponse> => {
  const formData: FormData = new FormData();

  const media: MediaPostModel = {
    uri: mediaUri,
    type: mediaType,
    name: media_id,
  };

  formData.append('media', media);

  try {
    const res: AxiosResponse<SuccessResponse> = await api.post<SuccessResponse>(
      FILE_UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default uploadFileAxios;
