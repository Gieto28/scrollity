import {View} from 'react-native';
import React from 'react';
import {ButtonLabel} from './Styled.OpacityButtonComponent';
import {TouchableOpacity} from 'react-native';

interface Props {
  name: string;
  onPress: () => void;

  // css
  fontSize?: string;
  fontWeight?: string;
}

/**
 * Description
 *
 * Scalable component to be used anywhere, simple to add functionality and customization
 *
 * Functionality
 *
 * @param { string } name
 * @param { function } onPress **used to handle the functions on click**
 *
 * Styling
 * @param { string } fontSize **change fontSize [ default - 32px ]**
 * @param { string } fontWeight **change Font Weight [ default - 400]**
 * @returns **a reusable button component for forms**
 */

const OpacityButtonComponent: React.FC<Props> = ({
  name,
  onPress,

  //   styling
  fontSize,
  fontWeight,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View>
        <ButtonLabel fontSize={fontSize} fontWeight={fontWeight}>
          {name}
        </ButtonLabel>
      </View>
    </TouchableOpacity>
  );
};

export default OpacityButtonComponent;
