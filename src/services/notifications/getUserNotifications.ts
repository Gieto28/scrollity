import {AxiosResponse} from 'axios';
import {NOTIFICATIONS_GET_USER} from '../../../env';
import {NotificationModel} from '../../models';
import api from '../auth/api';

const getUserNotifications = async (
  user_id: string | null,
): Promise<NotificationModel[]> => {
  console.log('------------------------------------', user_id);
  try {
    const path: string = `${NOTIFICATIONS_GET_USER}${user_id}`;

    const res: AxiosResponse<NotificationModel[]> = await api.get<
      NotificationModel[]
    >(path);
    console.log(res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default getUserNotifications;
