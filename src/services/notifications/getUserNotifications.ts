import {AxiosResponse} from 'axios';
import {NOTIFICATIONS_GET_USER} from '../../../env';
import {NotificationModel} from '../../models';
import api from '../auth/api';

const getUserNotifications = async (
  user_id: string | null,
): Promise<NotificationModel[]> => {
  try {
    const path: string = `${NOTIFICATIONS_GET_USER}${user_id}`;

    const res: AxiosResponse<NotificationModel[]> = await api.get<
      NotificationModel[]
    >(path);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getUserNotifications;
