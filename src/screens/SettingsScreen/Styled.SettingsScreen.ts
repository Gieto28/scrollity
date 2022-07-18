import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsText extends TextProps {
  theme: ThemeProps;
}

const SettingsHeader = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: row;
  justify-content: space-between;
  align-items: ${props => props.theme.display.alignCenter};
  margin: 8px 16px;
`;

const FormErrorText = styled.Text<PropsText>`
  color: ${props => props.theme.fonts.colors.primary};
  margin: 0 0 0 16px;
`;

const SettingsLabel = styled.Text<PropsText>`
  display: ${props => props.theme.display.display};
  align-self: ${props => props.theme.display.alignCenter};
  font-size: ${props => props.theme.fonts.fontSize.xl};
  color: ${props => props.theme.screen.text};
  margin: 0 0 24px 0;
`;

const EditProfileBody = styled.View<PropsView>`
  margin: 24px 16px;
`;

const RightSideHeader = styled.View`
  display: flex;
  flex-direction: row;
`;

const SignOutView = styled.View<PropsView>`
  margin: 24px 16px;
`;

export {
  RightSideHeader,
  SettingsHeader,
  SignOutView,
  EditProfileBody,
  SettingsLabel,
  FormErrorText,
};
