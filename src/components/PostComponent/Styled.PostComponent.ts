import {
  ImageProps,
  TextProps,
  TouchableOpacityProps,
  ViewProps,
} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

// interface Zacarias {
//   theme: ThemeProps;
// }

// type PropsImage = ImageProps | Zacarias;

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
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  width: 100%;
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
  font-size: ${props => props.theme.fonts.fontSize.lg};
  color: ${props => props.theme.screen.text};
`;

const PostBody = styled.View<PropsView>`
  max-width: 100%;
  height: auto;
  margin-bottom: 3px;
`;
const PostMedia = styled.Image<PropsImage>`
  max-width: 100%;
  width: auto;
  max-height: 100%;
`;
const PostDescription = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
  margin: 3px 16px;
`;
const PostFooter = styled.View<PropsView>`
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
  margin: 0 10px;
`;
const PostUpVoteIcon = styled.Image<PropsImage>`
  margin-right: 2px;
  width: ${props => props.theme.posts.icons.width};
  height: ${props => props.theme.posts.icons.height};
`;
const PostDownVoteIcon = styled.Image<PropsImage>`
  width: ${props => props.theme.posts.icons.width};
  height: ${props => props.theme.posts.icons.height};
`;
const PostValues = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
  margin: 0 2px 0 0;
`;

const PostButtonIcon = styled.TouchableOpacity<PropsTouchable>``;

const PostMessageIcon = styled.Image<PropsImage>`
  margin-right: 5px;
  width: ${props => props.theme.posts.icons.width};
  height: ${props => props.theme.posts.icons.height};
`;

export {
  PostHeaderTop,
  PostFullWidth,
  PostWrapper,
  PostMedia,
  PostHeader,
  PostBody,
  PostTitle,
  PostDescription,
  PostFooter,
  PostValuesWrapper,
  PostUpVoteIcon,
  PostDownVoteIcon,
  PostValues,
  PostButtonIcon,
  PostMessageIcon,
  PostHeaderTopText,
};
