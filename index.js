import {AppRegistry} from 'react-native';
import App from './App';
import 'react-native-get-random-values';
import {name as appName} from './app.json';

import './src/i18n';

AppRegistry.registerComponent(appName, () => App);
