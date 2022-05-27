import React from 'react';
import {Text, View} from 'react-native';
import {ParentView, Line, Label} from './Styled.SeparatorLineComponent';

interface Props {
  labelName: string;
}

/**
 *
 * @param labelName name to be put in the middle of the lines
 * @returns
 */
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
