import {ScrollViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface ViewScrollProps extends ScrollViewProps {
  theme: ThemeProps;
}

const ViewScroll = styled.ScrollView<ViewScrollProps>`
  background-color: ${props => props.theme.screen.background};
  padding-top: 10px;
`;

export {ViewScroll};
