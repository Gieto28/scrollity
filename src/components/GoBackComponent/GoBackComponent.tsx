import {Text} from 'react-native';
import React from 'react';
import {GoBackButton} from './Styled.GoBackComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface Props {
  onPress?: () => void;
  name?: string;
}

const GoBackComponent: React.FC<Props> = ({onPress, name}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <GoBackButton onPress={() => handleGoBack()}>
      <Text> « go back</Text>
    </GoBackButton>
  );
};

export default GoBackComponent;
