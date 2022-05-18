import {TouchableOpacity} from 'react-native';
import React from 'react';
import {LightDarkIcon} from './Styled.LightDarkButtonComponent';

interface Props {
  onPress?: () => void;
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
  let darkMode = true;

  const icons = {
    sunIcon: require('../../../assets/Images/sun-50.png'),
    moonIcon: require('../../../assets/Images/moon-30.png'),
  };

  darkMode ? icons.moonIcon : icons.sunIcon;

  return (
    <TouchableOpacity onPress={onPress}>
      <LightDarkIcon source={require('../../../assets/Images/sun-50.png')} />
    </TouchableOpacity>
  );
};

export default LightDarkButtonComponent;
