import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextInputProps {
  borderColor?: string;
  backgroundColor?: string;
}

const TextInputStyled = styled.TextInput<Props>`
  margin: 10px;
  border: 1px solid ${props => props.borderColor ?? 'black'};
  background-color: ${props => props.backgroundColor ?? 'white'};
  border-radius: 10px;
  padding: 16px;
`;
const Label = styled.Text`
  margin-left: 16px;
  font-weight: 700;
`;

export {TextInputStyled, Label};
