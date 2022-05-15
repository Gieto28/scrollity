import {TextProps, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

interface PropsButton extends TouchableOpacityProps {
  color?: string;
  backgroundColor?: string;
}

interface PropsLabel extends TextProps {
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
}

const OpacityButton = styled.TouchableOpacity<PropsButton>`
  color: ${props => props.color ?? 'black'};
`;

const ButtonLabel = styled.Text<PropsLabel>`
  color: ${props => props.color ?? 'white'};
  background-color: ${props => props.backgroundColor ?? '#00938e'};
  border: 1px solid ${props => props.borderColor ?? 'black'};
  border-radius: 10px;
  text-align: center;
  font-size: ${props => props.fontSize ?? '32px'};
  font-weight: ${props => props.fontWeight ?? '400'};
  margin: 10px;
  padding: 8px 0;
`;

export {OpacityButton, ButtonLabel};
