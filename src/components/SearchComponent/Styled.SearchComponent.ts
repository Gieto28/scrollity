import {TextInputProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface Props extends TextInputProps {
  theme: ThemeProps;
}

interface WrapperProps extends ViewProps {
  theme: ThemeProps;
}

interface IconButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const Input = styled.TextInput<Props>`
  margin: 10px;
  border: 1px solid ${props => props.theme.input.border};
  background-color: ${props => props.theme.input.background};
  border-radius: 8px;
  padding: 12px 20px 12px 20px;
  min-height: 40px;
  width: 85%;
  margin-left: 48px;
  /* flex: 1; */
`;

const SearchWrapper = styled.View<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: static;
  padding: 0 30px;
`;

const SubmitButton = styled.TouchableOpacity<IconButtonProps>`
  width: ${props => props.theme.SearchButton.width};
  height: ${props => props.theme.SearchButton.height};
  /* position: relative; */
  right: 50px;
  top: 2px;
  z-index: 100;
`;

const IconImage = styled.Image``;

export {Input, SearchWrapper, SubmitButton, IconImage};
