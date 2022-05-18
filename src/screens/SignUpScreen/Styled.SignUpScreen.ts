import {TextProps} from 'react-native';
import styled from 'styled-components/native';

interface TitleProps extends TextProps {
  theme: any;
}

const SignUpTitle = styled.Text<TitleProps>`
  font-size: 56px;
  color: ${props => props.theme.screen.text};
  text-align: center;
  margin-bottom: 30px;
`;

export {SignUpTitle};
