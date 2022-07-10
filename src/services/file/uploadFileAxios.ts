import {AxiosResponse} from 'axios';
import {api} from '..';
import {FILE_UPLOAD} from '../../utils/env';
import {SuccessResponse, MediaPostModel} from '../../models';

/**
 * After using image native picker to get the image information I call this method and send all of the form information through it.To be able to get the image on the node server I have to send content-type: multipart/form-data through the headers and send the information through a new FormData object with the following keys and values:
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

  console.log(mediaUri);
  console.log(media_id);
  console.log(mediaType);

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
    console.log('error while sending file to back end');
    throw new Error(e.message);
  }
};

export default uploadFileAxios;
