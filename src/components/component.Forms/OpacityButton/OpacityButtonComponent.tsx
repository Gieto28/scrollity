import {View} from 'react-native';
import React from 'react';
import {ButtonLabel, OpacityButton} from './Styled.OpacityButton';

interface Props {
  name: string;
  onButtonPress?: () => void;
  handleRedirectToRegister?: () => void;

  // css
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

/**
 *
 * @param param0
 * @returns
 */

const OpacityButtonComponent: React.FC<Props> = ({
  name,
  onButtonPress,
  handleRedirectToRegister,

  //   styling
  backgroundColor,
  color,
  borderColor,
  fontSize,
  fontWeight,
}) => {
  return (
    <OpacityButton
      onPress={onButtonPress || handleRedirectToRegister}
      activeOpacity={0.5}
      backgroundColor={backgroundColor}
      color={color}>
      <View>
        <ButtonLabel borderColor={borderColor} fontSize={fontSize}>
          {name}
        </ButtonLabel>
      </View>
    </OpacityButton>
  );
};

export default OpacityButtonComponent;
