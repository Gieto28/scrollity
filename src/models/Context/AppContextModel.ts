import {ThemeProps} from '../../styles/theme';
import NotificationModel from '../Models/NotificationModel';

/**
 * Model for the app settings context includes states and functions
 */
interface AppContextModel {
  theme: ThemeProps;
  notification: NotificationModel[];
  loadingNotifications: boolean;
  //functions
  changeLang: () => void;
  changeTheme(): Promise<void>;
  getNotifications(): Promise<void>;
}

export default AppContextModel;
