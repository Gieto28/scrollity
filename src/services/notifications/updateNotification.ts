import {AxiosResponse} from 'axios';
import {NOTIFICATION_UPDATE} from '../../../env';
import {SuccessResponse} from '../../models';
import api from '../auth/api';

/**
 *
 * @param notification_id notification id that is used to update the notification
 * @returns success response
 */
const updateNotification = async (
  notification_id: number,
): Promise<SuccessResponse> => {
  try {
    const path: string = `${NOTIFICATION_UPDATE}${notification_id}`;

    const res: AxiosResponse<SuccessResponse> = await api.post(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default updateNotification;
