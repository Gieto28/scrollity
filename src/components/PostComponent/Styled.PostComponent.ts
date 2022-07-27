import {
  ImageProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsImage extends ImageProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsTouchable extends TouchableOpacityProps {
  theme: ThemeProps;
}

const PostFullWidth = styled.View<PropsView>`
  border-top-width: 1px;
  border-top-color: ${props => props.theme.input.border};
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${props => props.theme.screen.background};
`;

const PostWrapper = styled.View<PropsView>`
  border-bottom-width: 1px;
  border-style: solid;
  border-bottom-color: ${props => props.theme.button.border};
`;

const PostHeader = styled.View<PropsView>`
  padding-top: 10px;
  margin: 0 16px 10px 16px;
  display: flex;
`;

const PostHeaderTop = styled.View<PropsView>``;

const PostHeaderTopText = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
`;

const PostTitle = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.l};
  color: ${props => props.theme.screen.text};
`;

const PostBody = styled.View<PropsView>`
  max-width: 100%;
  height: auto;
  margin-bottom: 3px;
`;
const PostMedia = styled.Image<PropsImage>``;

const PostDescriptionWrapper = styled.View``;
const PostMediaWrapper = styled.View``;

const VideoButton = styled.TouchableOpacity`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PauseImage = styled.Image`
  position: absolute;
  z-index: 1;
`;

const PostDescription = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
  margin: 3px 16px;
`;

const PostFooter = styled.View<PropsView>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 10px 14px 8px;
`;

const PostValuesWrapper = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 8px 0 16px;
`;

const PostCommentIconWrapper = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 24px;
`;

const PostValues = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
`;

const PostButtonIcon = styled.TouchableOpacity<PropsTouchable>``;

const PostMessageIcon = styled.Image<PropsImage>`
  margin-right: 5px;
  width: ${props => props.theme.posts.icons.width};
  height: ${props => props.theme.posts.icons.height};
`;

export {
  PostCommentIconWrapper,
  PostHeaderTop,
  PostFullWidth,
  PostWrapper,
  PostMediaWrapper,
  PostMedia,
  PostHeader,
  VideoButton,
  PauseImage,
  PostBody,
  PostTitle,
  PostDescriptionWrapper,
  PostDescription,
  PostFooter,
  PostValuesWrapper,
  PostValues,
  PostButtonIcon,
  PostMessageIcon,
  PostHeaderTopText,
};
