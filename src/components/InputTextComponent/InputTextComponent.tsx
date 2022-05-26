import React, {useEffect} from 'react';

import {Controller} from 'react-hook-form';

import {
  Input,
  Label,
  SubmitButton,
  IconImage,
  InputWrapper,
} from './Styled.InputTextComponent';
import useDeviceColor from '../../hooks/useDeviceColor';

interface Props {
  placeholder: string;
  value: string;
  controllerName: string;
  control: any;
  errors?: any;
  image?: any;
  onChangeText?: () => void | undefined;
  onPress?: () => void;
  onSubmitEditing?: () => void;

  // label
  label?: string;

  // customizing component
  borderColor?: string;
  backgroundColor?: string;
  placeholderColor?: string;
  securedBoolean?: boolean;
}

const InputTextComponent: React.FC<Props> = ({
  controllerName,
  control,
  errors,
  placeholder,
  securedBoolean,
  onPress,
  onSubmitEditing,

  // label
  label,

  // editing css
  borderColor,
  backgroundColor,

  // icon
  image,
}) => {
  useEffect(() => {
    console.log('Error', errors);
  }, [errors]);

  const theme = useDeviceColor();

  return (
    <InputWrapper>
      <Label>{label && `${label}:`}</Label>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            secureTextEntry={securedBoolean && true}
            placeholderTextColor={theme.input.text}
            onSubmitEditing={onSubmitEditing}
          />
        )}
        name={controllerName}
      />
      {image && (
        <SubmitButton onPress={onPress}>
          <IconImage source={image} />
        </SubmitButton>
      )}

      {errors && <Label>This field is required!</Label>}
    </InputWrapper>
  );
};

export default InputTextComponent;
