import {View} from 'react-native';
import React from 'react';
import {ButtonLabel, OpacityButton} from './Styled.OpacityButtonComponent';

interface Props {
  name: string;
  onPress: () => void;

  // css
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
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
 * @param { string } color **change font color [ default - white ]**
 * @param { string } fontSize **change fontSize [ default - 32px ]**
 * @param { string } fontWeight **change Font Weight [ default - 400]**
 * @param { string } backgroundColor **change background color [ default - x ]**
 * @param { string } borderColor **change border color [ default - black ]**
 * @returns **a reusable button component for forms**
 */

const OpacityButtonComponent: React.FC<Props> = ({
  name,
  onPress,

  //   styling
  backgroundColor,
  color,
  borderColor,
  fontSize,
  fontWeight,
}) => {
  return (
    <OpacityButton onPress={onPress} activeOpacity={0.5}>
      <View>
        <ButtonLabel
          color={color}
          fontSize={fontSize}
          fontWeight={fontWeight}
          borderColor={borderColor}
          backgroundColor={backgroundColor}>
          {name}
        </ButtonLabel>
      </View>
    </OpacityButton>
  );
};

export default OpacityButtonComponent;
