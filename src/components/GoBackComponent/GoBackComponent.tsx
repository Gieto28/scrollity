import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface Props {
  onPress: () => void;
  name: string;
}

const GoBackComponent: React.FC<Props> = ({onPress, name}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default GoBackComponent;
