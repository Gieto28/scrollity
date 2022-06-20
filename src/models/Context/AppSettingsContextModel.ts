import {ThemeProps} from '../../styles/theme';

/**
 * Model for the app settings context includes states and functions
 */
interface AppSettingsContextModel {
  language: string;
  theme: ThemeProps;
  //functions
  changeTheme(): Promise<void>;
}

export default AppSettingsContextModel;
