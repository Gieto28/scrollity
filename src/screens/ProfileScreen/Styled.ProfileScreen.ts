import {TextProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface ButtonProps extends TouchableOpacityProps {
  theme: ThemeProps;
}

const ProfileHeader = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  width: 100%;
  margin: 15px 15px 10px 15px;
`;

const ProfilePictureWrapper = styled.View`
  align-self: flex-start;
  max-width: 80px;
  max-height: 80px;
`;

const ProfilePicture = styled.Image`
  height: 100%;
`;

const ProfileNameWrapper = styled.View<PropsView>`
  width: 72%;
  display: ${props => props.theme.display.display};
  justify-content: center;
  align-items: center;
`;

const ProfileName = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
  font-weight: ${props => props.theme.fonts.fontWeight.l};
`;

const ProfileInfoWrapper = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  justify-content: space-between;
  align-items: ${props => props.theme.display.alignCenter};
  margin: 0 35px 0 35px;
`;

const ProfileInfoAccAge = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: 20px;
`;

const ProfileMediaOptionsWrapper = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  justify-content: space-around;
  margin: 15px;
`;

const ProfileOptionsButton = styled.TouchableOpacity<ButtonProps>``;

const ProfileMediaOptionsText = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
`;
const ProfileMediaWrapper = styled.View`
  margin: 15px;
`;

export {
  ProfileHeader,
  ProfilePicture,
  ProfilePictureWrapper,
  ProfileInfoWrapper,
  ProfileInfoAccAge,
  ProfileMediaOptionsWrapper,
  ProfileNameWrapper,
  ProfileName,
  ProfileMediaOptionsText,
  ProfileOptionsButton,
  ProfileMediaWrapper,
};
