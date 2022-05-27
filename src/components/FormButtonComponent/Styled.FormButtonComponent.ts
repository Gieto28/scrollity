import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsLabel extends TextProps {
  fontSize?: string;
  fontWeight?: string;
  theme: ThemeProps;
}

const ButtonLabel = styled.Text<PropsLabel>`
  color: ${props => props.theme.button.text};
  background-color: ${props => props.theme.button.background};
  border: 1px solid ${props => props.theme.button.border};
  border-radius: 10px;
  text-align: center;
  font-size: ${props => props.fontSize ?? props.theme.fonts.fontSize.xl};
  font-weight: ${props => props.fontWeight ?? props.theme.fonts.fontWeight.md};
  margin: 12px;
  padding: 8px 0;
`;

export {ButtonLabel};
