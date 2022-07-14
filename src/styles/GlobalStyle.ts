import {ImageProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from './theme';

interface ScreenProps extends ViewProps {
  theme: ThemeProps;
}

interface PropsImage extends ImageProps {
  theme: ThemeProps;
}

interface PropsTouchable extends TouchableOpacityProps {
  theme: ThemeProps;
}

// make obj here and export theme
const GlobalView = styled.View<ScreenProps>`
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
`;

const AuthScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
})<ScreenProps>`
  flex-grow: 1;
  background-color: ${props => props.theme.screen.background};
`;

const AuthView = styled.View<ScreenProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.screen.background};
  /* height: 100%; */
  padding: 0 24px;
`;

const AppScrollView = styled.ScrollView<ScreenProps>`
  flex-grow: 1;
  background-color: ${props => props.theme.screen.background};
  color: ${props => props.theme.screen.text};
`;

const AppView = styled.View<ScreenProps>`
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.fonts.colors.secondary};
`;

const StyledView = styled.View<ScreenProps>`
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

export {
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
