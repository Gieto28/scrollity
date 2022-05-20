import {Text} from 'react-native';
import React from 'react';
import {GoBackButton} from './Styled.GoBackComponent';

interface Props {
  onPress: () => void;
  name: string;
}

const GoBackComponent: React.FC<Props> = ({onPress, name}) => {
  return (
    <GoBackButton onPress={onPress}>
      <Text>{name}</Text>
    </GoBackButton>
  );
};

export default GoBackComponent;
