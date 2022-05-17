import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import Themes from '../styles/Themes';

const useDeviceColor = () => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState(Themes.dark);

  useEffect(() => {
    if (deviceTheme === 'light') {
      setTheme(Themes.light);
    } else if (deviceTheme === 'dark') {
      setTheme(Themes.dark);
    }
  }, [deviceTheme]);

  return theme;
};

export default useDeviceColor;

// returns light, dark or null
