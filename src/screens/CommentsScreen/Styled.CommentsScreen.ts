import {ScrollViewProps, TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsScroll extends ScrollViewProps {
  theme: ThemeProps;
}

interface PropsText extends TextProps {
  theme: ThemeProps;
}

const ScreenWrapper = styled.View<PropsView>`
  /* min-height: 100%; */
`;

const CommentsView = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  min-height: 100%;
  padding-bottom: 80px;
`;

const ScrollComments = styled.ScrollView<PropsScroll>`
  background-color: ${props => props.theme.screen.primaryColor};

  min-height: 100%;
`;

const ViewComments = styled.View<PropsView>`
  background-color: ${props => props.theme.screen.background};
  background-color: ${props => props.theme.screen.primaryColor};
`;

const NoCommentsView = styled.View`
  display: flex;
  align-items: center;
  margin-top: 30px;
  width: 90%;
  align-self: center;
`;
const NoCommentsText = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
  text-align: center;
`;

const SendMessageView = styled.View<PropsView>`
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

export {
  CommentsView,
  NoCommentsView,
  NoCommentsText,
  ScreenWrapper,
  ScrollComments,
  ViewComments,
  SendMessageView,
};
