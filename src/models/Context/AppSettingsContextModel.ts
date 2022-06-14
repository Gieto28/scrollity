import {ThemeProps} from '../../styles/theme';

interface AppSettingsContextModel {
  language: string;
  theme: ThemeProps;
  //functions
  changeTheme: () => Promise<void>;
}

export default AppSettingsContextModel;
