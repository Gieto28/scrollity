import {ThemeProps} from '../../styles/theme';

interface AppContextModel {
  language: string;
  theme: ThemeProps;
  changeTheme: () => Promise<void>;
}

export default AppContextModel;
