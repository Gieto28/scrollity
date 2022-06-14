import React from 'react';
import {View} from 'react-native';
import {ParentView, Line, Label} from './Styled.SeparatorLineComponent';

interface Props {
  labelName?: string;
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
      {labelName && (
        <View>
          <Label>{labelName}</Label>
        </View>
      )}
      <Line />
    </ParentView>
  );
};

export default SeparatorLineComponent;
