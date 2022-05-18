import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from '../styles/theme';

const useDeviceColor = () => {
  const deviceTheme = useColorScheme();
  const [colorTheme, setColorTheme] = useState(darkTheme);

  useEffect(() => {
    if (deviceTheme === 'light') {
      setColorTheme(lightTheme);
    } else if (deviceTheme === 'dark') {
      setColorTheme(darkTheme);
    }
  }, [deviceTheme]);

  return colorTheme;
};

export default useDeviceColor;

// returns light, dark or null
