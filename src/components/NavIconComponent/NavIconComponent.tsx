import {View, Text} from 'react-native';
import React from 'react';
import {NavIcon} from './Styled.NavIconComponent';

interface Props {
  source: any;
  focused: boolean;
}

const NavIconComponent: React.FC<Props> = ({focused, source}) => {
  return <NavIcon source={source} focused={focused} />;
};

export default NavIconComponent;
