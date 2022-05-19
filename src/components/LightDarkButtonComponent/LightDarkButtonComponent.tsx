import React from 'react';
import useDeviceColor from '../../hooks/useDeviceColor';
import {
  IconButton,
  LightDarkIcon,
  IconView,
} from './Styled.LightDarkButtonComponent';

interface Props {
  onPress?: () => void;
  name?: string;
}

/**
 *
 * Functionality
 *
 * @param { function } onPress **used to handle the functions on click**
 *
 * Styling
 */

const LightDarkButtonComponent: React.FC<Props> = ({onPress}) => {
  const theme = useDeviceColor();

  const iconImage = theme.bool
    ? require('../../assets/Images/moon-30.png')
    : require('../../assets/Images/sun-50.png');

  return (
    <IconView>
      <IconButton title="dark or light mode" onPress={onPress}>
        <LightDarkIcon source={iconImage} />
      </IconButton>
    </IconView>
  );
};

export default LightDarkButtonComponent;
