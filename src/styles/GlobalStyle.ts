import {ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from './theme';

interface ScreenProps extends ViewProps {
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
  background-color: ${props => props.theme.screen.background};
`;

const StyledView = styled.View<ScreenProps>`
  background-color: ${props => props.theme.screen.background};
`;

export {
  StyledView,
  GlobalView,
  AuthScrollView,
  AuthView,
  AppScrollView,
  AppView,
};
