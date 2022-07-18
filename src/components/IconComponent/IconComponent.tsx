import React from 'react';
import {ImageSourcePropType, ViewStyle} from 'react-native';
import {Icon, IconButton} from './Styled.IconComponent';

interface Props {
  image: ImageSourcePropType;
  altText: string;
  onPress: () => void;
  style?: ViewStyle;
}

/**
 * @param onPress - function to do something when this icon is clicked to be defined in parent components
 * @param icon - I've decided to define which image is rendered here instead of the parent so I don't have big long texts of ternary operators deciding it for me
 * @param altText - string for the visual impaired to hear what the button does if needed
 * @param image - require from theme Index.ts which can be any icon available
 * @returns a simple button with a left arrow icon to go back to the previous navigation screen no matter where the user is at the moment he clicks on it
 */
const IconComponent: React.FC<Props> = ({image, altText, onPress, style}) => {
  return (
    <IconButton onPress={onPress} style={style}>
      <Icon source={image} accessibilityLabel={altText} resizeMode="contain" />
    </IconButton>
  );
};

export default IconComponent;
