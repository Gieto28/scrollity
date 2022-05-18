import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface TitleProps extends TextProps {
  theme: ThemeProps;
}

const SignUpTitle = styled.Text<TitleProps>`
  font-size: 56px;
  color: ${props => props.theme.screen.text};
  text-align: center;
  margin-bottom: 30px;
`;

export {SignUpTitle};
