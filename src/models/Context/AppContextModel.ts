import {ThemeProps} from '../../styles/theme';

/**
 * Model for the app settings context includes states and functions
 */
interface AppContextModel {
  changeLang: () => void;
  theme: ThemeProps;
  //functions
  changeTheme(): Promise<void>;
}

export default AppContextModel;
