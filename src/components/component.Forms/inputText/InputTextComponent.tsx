import {Text} from 'react-native';
import React, {useEffect} from 'react';

import {Controller, FieldError} from 'react-hook-form';

import {TextInputStyled, Label} from './Styled.InputTextComponent';

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
          />
        )}
        name={controllerName}
      />
      {icon && icon}
      {errors && <Label>field {controllerName} missing</Label>}
    </>
  );
};

export default InputTextComponent;
