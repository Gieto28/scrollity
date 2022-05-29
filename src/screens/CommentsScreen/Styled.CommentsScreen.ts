import {ScrollViewProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsScroll extends ScrollViewProps {
  theme: ThemeProps;
}

const CommentsView = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  min-height: 100%;
`;

const ScrollComments = styled.ScrollView<PropsScroll>`
  background-color: ${props => props.theme.screen.background};
`;

const ViewComments = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
`;

const SendMessageView = styled.View<PropsView>`
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

export {CommentsView, ScrollComments, ViewComments, SendMessageView};
