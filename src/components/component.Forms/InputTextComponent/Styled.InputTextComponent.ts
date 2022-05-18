import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextInputProps {
  borderColor?: string;
  backgroundColor?: string;

  // theme
  theme: any;
}

const TextInputStyled = styled.TextInput<Props>`
  margin: 10px;
  border: 1px solid ${props => props.theme.input.border};
  background-color: ${props => props.theme.input.background};
  border-radius: 10px;
  padding: 16px;
`;
const Label = styled.Text`
  margin-left: 16px;
  font-weight: 700;
`;

export {TextInputStyled, Label};
