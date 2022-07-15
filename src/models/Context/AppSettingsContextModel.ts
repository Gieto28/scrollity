import {ThemeProps} from '../../styles/theme';

/**
 * Model for the app settings context includes states and functions
 */
interface AppSettingsContextModel {
  t: any;
  i18n: any;
  language: string;
  changeLanguage: (lang: string) => void;
  theme: ThemeProps;
  //functions
  changeTheme(): Promise<void>;
}

export default AppSettingsContextModel;
