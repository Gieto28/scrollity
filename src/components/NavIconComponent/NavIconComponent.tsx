import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {NavIcon} from './Styled.NavIconComponent';

interface Props {
  image: ImageSourcePropType;
  focused: boolean;
}
/**
 * @param focused - boolean value that is automatic from tabBarIcon passed into the arrow function as a param and into the component which is read on this component and then on styled file to determine if the opacity should be 1 (true) or 0.5 (false)
 * @param image - require image from theme index which already reads theme and returns proper image, either light or dark mode
 * @returns a simple image component that is either 1 opacity if active and 0.5 opacity if inactive
 */
const NavIconComponent: React.FC<Props> = ({focused, image}) => {
  return <NavIcon source={image} focused={focused} />;
};

export default NavIconComponent;
