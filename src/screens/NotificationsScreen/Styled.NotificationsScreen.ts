import {ScrollViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface ViewScrollProps extends ScrollViewProps {
  theme: ThemeProps;
}

const ViewScroll = styled.ScrollView<ViewScrollProps>`
  background-color: ${props => props.theme.screen.background};
  border: 1px solid ${props => props.theme.screen.text};
  height: 100%;
  padding-top: 10px;
`;

const ButtonToHomeScreen = styled.TouchableOpacity``;

const ButtonText = styled.Text``;

export {ViewScroll, ButtonToHomeScreen, ButtonText};
