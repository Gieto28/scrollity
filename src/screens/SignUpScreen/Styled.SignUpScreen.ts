import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsText extends TextProps {
  theme: ThemeProps;
}

const ErrorWhileSignUpText = styled.Text<PropsText>`
  color: ${props => props.theme.fonts.colors.primary};
  margin: 0 0 5px 16px;
`;

const IconWrapper = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 4px 24px 0 24px;
`;

export {IconWrapper, ErrorWhileSignUpText};
