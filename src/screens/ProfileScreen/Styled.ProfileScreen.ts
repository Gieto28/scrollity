import {
  ScrollViewProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
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

interface ScrollProps extends ScrollViewProps {
  theme: ThemeProps;
}

const ProfileWrapper = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.primaryColor};
  min-height: 100%;
`;

const ProfileHeader = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  background-color: ${props => props.theme.screen.background};
  width: 100%;
  padding: 15px 15px 10px 15px;
`;

const ProfilePictureWrapper = styled.View<PropsView>`
  align-self: flex-start;
  max-width: 80px;
  max-height: 80px;
  background-color: ${props => props.theme.screen.background};
`;

const ProfilePicture = styled.Image`
  height: 100%;
`;

const ProfileNameWrapper = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  width: 72%;
  display: ${props => props.theme.display.display};
  justify-content: center;
  align-items: center;
`;

const ProfileName = styled.Text<PropsText>`
  background-color: ${props => props.theme.screen.background};
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
  font-weight: ${props => props.theme.fonts.fontWeight.l};
`;

const ProfileInfoWrapper = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  justify-content: space-between;
  align-items: ${props => props.theme.display.alignCenter};
  padding: 0 35px 0 35px;
`;

const ProfileInfoAccAge = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  background-color: ${props => props.theme.screen.background};
  font-size: 20px;
`;

const ProfileFilter = styled.View<PropsView>`
  display: ${props => props.theme.display.display};
  flex-direction: ${props => props.theme.display.directionRow};
  justify-content: space-around;
  background-color: ${props => props.theme.screen.background};
  padding: 15px 0 0 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

const ProfilePostsWrapper = styled.View`
  margin: 0 0 16px 0;
`;

const ProfileScroll = styled.ScrollView<ScrollProps>`
  margin-bottom: 180px;
`;

const ProfileOptionsButton = styled.TouchableOpacity<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 30px;
`;

const RenderPosts = styled.View<PropsView>`
  min-height: 100%;
`;

const ProfileMediaOptionsText = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
`;
const ProfileMediaWrapper = styled.View<PropsView>`
  display: flex;
  background-color: ${props => props.theme.screen.background};
  margin: 15px;
`;

export {
  RenderPosts,
  ProfileWrapper,
  ProfileHeader,
  ProfilePicture,
  ProfilePictureWrapper,
  ProfileScroll,
  ProfileInfoWrapper,
  ProfilePostsWrapper,
  ProfileInfoAccAge,
  ProfileFilter,
  ProfileNameWrapper,
  ProfileName,
  ProfileMediaOptionsText,
  ProfileOptionsButton,
  ProfileMediaWrapper,
};
