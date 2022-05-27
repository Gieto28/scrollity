import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface TitleProps extends TextProps {
  fontSize?: string;
  fontWeight?: string;

  // theme
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

const IconWrapper = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 4px 24px 0 24px;
`;

const LoginTitle = styled.Text<TitleProps>`
  font-size: ${props => props.theme.fonts.fontSize.xxl};
  color: ${props => props.theme.fonts.colors.secondary};
  text-align: center;
  margin-bottom: 50px;
`;

export {LoginTitle, IconWrapper};
