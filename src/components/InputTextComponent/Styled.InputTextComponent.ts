import {
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsInput extends TextInputProps {
  // theme
  theme: ThemeProps;
}

interface IconButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsText extends TextProps {
  theme: ThemeProps;
}

const InputWrapper = styled.View<PropsView>``;

const Input = styled.TextInput<PropsInput>`
  color: ${props => props.theme.screen.text};
  margin: 12px;
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
  top: 32px;
  z-index: 1;
`;

const IconImage = styled.Image``;

const ErrorLabel = styled.Text<PropsText>`
  color: ${props => props.theme.fonts.colors.primary};
  margin-left: 16px;
  font-weight: ${props => props.theme.fonts.fontWeight.l};
`;

export {Input, Label, SubmitButton, IconImage, InputWrapper, ErrorLabel};
