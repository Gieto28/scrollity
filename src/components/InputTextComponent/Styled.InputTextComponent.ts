import {TextInputProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface Props extends TextInputProps {
  borderColor?: string;
  backgroundColor?: string;

  // theme
  theme: ThemeProps;
}

interface IconButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

const InputWrapper = styled.View<PropsView>`
  position: relative;
`;

const Input = styled.TextInput<Props>`
  margin: 10px;
  border: 1px solid ${props => props.theme.input.border};
  background-color: ${props => props.theme.input.background};
  border-radius: 10px;
  padding: 16px 50px 16px 16px;
`;

const Label = styled.Text`
  margin-left: 16px;
  font-weight: 700;
`;

const SubmitButton = styled.TouchableOpacity<IconButtonProps>`
  width: ${props => props.theme.SearchButton.width};
  height: ${props => props.theme.SearchButton.height};
  position: absolute;
  right: 20px;
  top: 48px;
  z-index: 1;
`;

const IconImage = styled.Image``;

export {Input, Label, SubmitButton, IconImage, InputWrapper};
