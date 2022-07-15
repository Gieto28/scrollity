import {
  ImageProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from './theme';

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsImage extends ImageProps {
  theme: ThemeProps;
}

interface PropsTouchable extends TouchableOpacityProps {
  theme: ThemeProps;
}

interface PropsText extends TextProps {
  theme: ThemeProps;
}

// make obj here and export theme
const GlobalView = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
`;

const AuthScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
})<PropsView>`
  flex-grow: 1;
  background-color: ${props => props.theme.screen.background};
`;

const AuthView = styled.View<PropsView>`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.screen.background};
  /* height: 100%; */
  padding: 0 24px;
`;

const AppScrollView = styled.ScrollView<PropsView>`
  flex-grow: 1;
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
`;

const AppView = styled.View<PropsView>`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.fonts.colors.secondary};
`;

const StyledView = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
`;

const DownVoteIcon = styled.Image<PropsImage>`
  width: ${props => props.theme.posts.icons.width};
  height: ${props => props.theme.posts.icons.height};
`;

const UpVoteIcon = styled.Image<PropsImage>`
  width: ${props => props.theme.posts.icons.width};
  height: ${props => props.theme.posts.icons.height};
`;

const VoteButton = styled.TouchableOpacity<PropsTouchable>``;

const NoContentView = styled.View`
  display: flex;
  align-items: center;
  margin-top: 30px;
  width: 90%;
  align-self: center;
`;
const NoContentText = styled.Text<PropsText>`
  margin-top: 20px;
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
  text-align: center;
`;

export {
  NoContentText,
  NoContentView,
  UpVoteIcon,
  DownVoteIcon,
  VoteButton,
  StyledView,
  GlobalView,
  AuthScrollView,
  AuthView,
  AppScrollView,
  AppView,
};
