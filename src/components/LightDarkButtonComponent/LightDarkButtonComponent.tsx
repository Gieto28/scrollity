import React from 'react';
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
  let darkMode = false;

  const sunIcon = require('../../assets/Images/sun-50.png');
  const moonIcon = require('../../assets/Images/moon-30.png');

  return (
    <IconView>
      <IconButton title="dark or light mode" onPress={onPress}>
        <LightDarkIcon source={darkMode ? moonIcon : sunIcon} />
      </IconButton>
    </IconView>
  );
};

export default LightDarkButtonComponent;
