import React from 'react';
import {GoBackButton, GoBackIcon} from './Styled.GoBackComponent';
import {CommonActions, useNavigation} from '@react-navigation/native';
import useDeviceColor from '../../hooks/useDeviceColor';

interface Props {
  onPress?: () => void;
  name?: string;
}

const theme = useDeviceColor();

const icon = theme.bool
  ? require('../../assets/Images/arrow-left-dark-24.png')
  : require('../../assets/Images/arrow-left-light-24.png');

const GoBackComponent: React.FC<Props> = ({onPress, name}) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <GoBackButton onPress={() => handleGoBack()}>
      <GoBackIcon
        source={icon}
        accessibilityLabel="This icon redirects you to the previous screen"
      />
    </GoBackButton>
  );
};

export default GoBackComponent;
