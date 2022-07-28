import React from 'react';
import {Control, Controller, FieldError} from 'react-hook-form';
import {
  Input,
  Label,
  SubmitButton,
  IconImage,
  InputWrapper,
  ErrorLabel,
} from './Styled.InputTextComponent';
import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {useApp} from '../../context';
import {FormControllerName} from '../../models';

interface Props {
  placeholder: string;
  multiline?: boolean;
  numberOfLines?: number;
  label?: string;
  securedBoolean?: boolean;
  keyboard?: KeyboardTypeOptions;
  controllerName: FormControllerName;
  control: Control<any>;
  errors?: FieldError | undefined;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle | TextStyle>;
  onPress?: () => void;
  onSubmitEditing?: () => void;
}

/**
 * Uses React-Hook-Forms
 * @param placeholder - string that goes inside the input
 * @param controllerName - name of the controller assigned to that input i.e password field input would have controllerName attribute = to "password"
 * @param control - the variable retrieved from the useForm destructuring, usually control
 * @param label - **OPTIONAL** adds a string to the top of the input, good for forms to specify what the input correlates to. i.e. password input has a "Your password" label
 * @param securedBoolean - **OPTIONAL** boolean value from react-hook-forms which if true makes the string little circles ● instead of the characters. Default is false
 * @param errors - **OPTIONAL** attribute in case your input can't retrieve errors itself and the errors would be checked somewhere else. i.e. search input would have errors checked when fetching and return error or message if no search is found but any search is valid in it self
 * @param style if additional styles are needed for the input text then use this parameter to change whatever is necessary using inline styling
 * @param customIconStyles if additional styles are needed for the icon then use this parameter to change whatever is necessary using inline styling
 * @param icon - **OPTIONAL** icon that shows on the right side of the input text usually for search icons and send icon
 * @param multiline - **optional** boolean value to determine if the text input can be multiline
 * @param numberOfLines - number of multi lines when using multiline
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
  numberOfLines,
  securedBoolean,
  onPress,
  keyboard,
  onSubmitEditing,
  label,
  icon,
}) => {
  const {theme} = useApp();

  const iconStyles = {
    marginTop: label ? 16 : 0,
    marginRight: 5,
  };

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
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderColor: errors?.message ? '#e63225' : theme.screen.text,
              borderWidth: errors?.message ? 2 : 1,
              textAlignVertical: multiline ? 'top' : 'center',
            }}
            keyboardType={keyboard}
            value={value}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
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
        <SubmitButton style={icon ? iconStyles : null} onPress={onPress}>
          <IconImage source={icon} />
        </SubmitButton>
      )}
      {errors && <ErrorLabel>{errors.message}</ErrorLabel>}
    </InputWrapper>
  );
};

export default InputTextComponent;
