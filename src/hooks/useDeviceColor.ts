import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from '../styles/theme';
/**
 * hook reads device theme and depending on it's theme it'll also change the apps theme
 * @returns theme object - either light or dark
 */
const useDeviceColor = () => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    if (deviceTheme === 'light') {
      setTheme(lightTheme);
    } else if (deviceTheme === 'dark') {
      setTheme(darkTheme);
    }
  }, [deviceTheme]);

  return theme;
};

export default useDeviceColor;

// returns light, dark or null
