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
  icon?: any;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
  onChangeText?: () => void | undefined;
  onPress?: () => void;
  onSubmitEditing?: () => void;

  // label
  label?: string;

  // customizing component
  securedBoolean?: boolean;
}

/**
 * Uses React-Hook-Forms
 * @param placeholder - string that goes inside the input
 * @param value - initial value you want the input to have
 * @param controllerName - name of the controller assigned to that input i.e password field input would have controllerName attribute = to "password"
 * @param control - the variable retrieved from the useForm destructuring, usually control
 * @param label - **OPTIONAL** adds a string to the top of the input, good for forms to specify what the input correlates to. i.e. password input has a "Your password" label
 * @param securedBoolean - **OPTIONAL** boolean value from react-hook-forms which if true makes the string little circles ● instead of the characters. Default is false
 * @param errors - **OPTIONAL** attribute in case your input can't retrieve errors itself and the errors would be checked somewhere else. i.e. search input would have errors checked when fetching and return error or message if no search is found but any search is valid in it self
 * @param icon - **OPTIONAL** icon that shows on the right side of the input text usually for search icons and send icon
 * @param multiline - **optional** boolean value to determine if the text input can be multiline
 * @param numberOfLines - number of multi lines when using multiline
 * @param onChangeText - **OPTIONAL** returns value on every change
 * @param onSubmitEditing - **OPTIONAL** needed if you want the user to be able to send with keyboard button
 * @param onPress - **OPTIONAL** complements the icon - it's **NEEDED** if you pass in an icon prop, usually the function is the same as the onChangeText and on SubmitEditing
 * @returns a fully customizable and scalable text input for forms, search bars, sending messages and anywhere else
 */
const InputTextComponent: React.FC<Props> = ({
  controllerName,
  control,
  errors,
  placeholder,
  multiline,
  style,
  numberOfLines,
  securedBoolean,
  onPress,
  onSubmitEditing,
  onChangeText,

  // label
  label,

  // icon
  icon,
}) => {
  useEffect(() => {
    console.log('Error', errors);
  }, [errors]);

  const theme = useDeviceColor();

  return (
    <InputWrapper>
      {label && <Label>{label}:</Label>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            style={style}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={securedBoolean}
            placeholderTextColor={theme.input.text}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        )}
        name={controllerName}
      />
      {icon && (
        <SubmitButton onPress={onPress}>
          <IconImage source={icon} />
        </SubmitButton>
      )}

      {errors && <Label>{errors.message}</Label>}
    </InputWrapper>
  );
};

export default InputTextComponent;
