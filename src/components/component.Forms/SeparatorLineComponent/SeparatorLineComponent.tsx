import React from 'react';
import {Text, View} from 'react-native';
import {ParentView, Line, Label} from './Styled.SeparatorLine';

interface Props {
  labelName: string;
}

const SeparatorLineComponent: React.FC<Props> = ({labelName}) => {
  return (
    <ParentView>
      <Line />
      <View>
        <Label>{labelName}</Label>
      </View>
      <Line />
    </ParentView>
  );
};

export default SeparatorLineComponent;
