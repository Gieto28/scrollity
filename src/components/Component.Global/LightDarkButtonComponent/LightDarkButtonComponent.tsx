import {Image, ImageSourcePropType, View} from 'react-native';
import React from 'react';
import {
  LightDarkButton,
  LightDarkText,
} from './Styled.LightDarkButtonComponent';

const sunIcon = require('../../../assets/Images/sun-50.png');
const moonIcon = require('../../../assets/Images/moon-30.png');

interface Props {
  onPress?: () => void;
}

/**
 * Description
 *
 * Scalable component to be used anywhere, simple to add functionality and customization
 *
 * Functionality
 *
 * @param { function } onPress **used to handle the functions on click**
 *
 * Styling
 */

const LightDarkButtonComponent: React.FC<Props> = ({onPress}) => {
  // const darkMode: ? moonIcon : sunIcon

  return (
    <LightDarkButton onPress={onPress}>
      <Image source={require('../../../assets/Images/sun-50.png')} />
      <LightDarkText>Test</LightDarkText>
    </LightDarkButton>
  );
};

export default LightDarkButtonComponent;
