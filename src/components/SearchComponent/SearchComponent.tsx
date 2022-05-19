import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import {
  IconImage,
  Input,
  SearchWrapper,
  SubmitButton,
} from './Styled.SearchComponent';
import useDeviceColor from '../../hooks/useDeviceColor';

interface Props {
  placeholder: string;
  value: string;
  controllerName: string;
  control: any;

  onPress: () => void;
  onSubmitEditing: () => void;
}

const SearchComponent: React.FC<Props> = ({
  placeholder,
  onSubmitEditing,
  value,
  controllerName,
  control,
  onPress,
}) => {
  const theme = useDeviceColor();
  const [icon, setIcon] = useState('');
  useEffect(() => {
    if (theme.key == 'light') {
      setIcon(require('../../assets/Images/search-24-dark.png'));
    } else {
      setIcon(require('../../assets/Images/search-24-light.png'));
    }

    const searchIcon = icon;
  }, []);

  return (
    <SearchWrapper>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholderTextColor={theme.input.text}
            onSubmitEditing={onSubmitEditing}
          />
        )}
        name={controllerName}
      />
      <SubmitButton onPress={onPress}>
        <IconImage
          source={require('../../assets/Images/search-24-light.png')}
        />
      </SubmitButton>
    </SearchWrapper>
  );
};

export default SearchComponent;
