import {AxiosResponse} from 'axios';
import {NOTIFICATION_UPDATE} from '../../../env';
import api from '../auth/api';

const updateNotification = async (notification_id: number) => {
  console.log(notification_id);
  try {
    const path: string = `${NOTIFICATION_UPDATE}${notification_id}`;

    const res: AxiosResponse<any> = await api.post(path);
    console.log(res.data);
    return res.data;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export default updateNotification;
