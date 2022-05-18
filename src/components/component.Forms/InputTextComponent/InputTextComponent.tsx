import React, {useEffect} from 'react';

import {Controller} from 'react-hook-form';

import {TextInputStyled, Label} from './Styled.InputTextComponent';
import useDeviceColor from '../../../hooks/useDeviceColor';

interface Props {
  placeholder: string;
  onChangeText?: () => void | undefined;
  value: string;
  controllerName: string;
  control: any;
  errors?: any;

  // label
  label: string;

  // customizing component
  borderColor?: string;
  backgroundColor?: string;
  placeholderColor?: string;

  // icon
  icon?: any;
  securedBoolean?: boolean;
}

const InputTextComponent: React.FC<Props> = ({
  controllerName,
  control,
  errors,
  placeholder,
  securedBoolean,

  // label
  label,

  // editing css
  borderColor,
  backgroundColor,

  // icon
  icon,
}) => {
  useEffect(() => {
    console.log('Error', errors);
  }, [errors]);

  const theme = useDeviceColor();

  return (
    <>
      <Label>{label}:</Label>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInputStyled
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            secureTextEntry={securedBoolean && true}
            placeholderTextColor={theme.input.text}
          />
        )}
        name={controllerName}
      />
      {icon && icon}
      {errors && <Label>This field is required!</Label>}
    </>
  );
};

export default InputTextComponent;
