import {TextProps} from 'react-native';
import styled from 'styled-components/native';

interface TitleProps extends TextProps {
  fontSize?: string;
  fontWeight?: string;

  // theme
  theme: any;
}

const LoginTitle = styled.Text<TitleProps>`
  font-size: ${props => props.theme.fonts.fontSize.xxl};
  color: ${props => props.theme.fonts.colors.secondary};
  text-align: center;
  margin-bottom: 50px;
`;

export {LoginTitle};
