import React from 'react';
import {Icon, IconButton} from './Styled.IconComponent';

interface Props {
  image: any;
  altText: string;
  onPress: () => void;
}

/**
 * @param onPress - function to do something when this icon is clicked to be defined in parent components
 * @param altText - string for the visual impaired to hear what the button does if needed
 * @param image - require from theme Index.ts which can be any icon available
 * @returns a simple button with a left arrow icon to go back to the previous navigation screen no matter where the user is at the moment he clicks on it
 */
const IconComponent: React.FC<Props> = ({image, altText, onPress}) => {
  return (
    <IconButton onPress={onPress}>
      <Icon source={image} accessibilityLabel={altText} resizeMode="contain" />
    </IconButton>
  );
};

export default IconComponent;
