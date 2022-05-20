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
  display: flex;
  justify-content: center;
  width: 100%;
`;
const PostWrapper = styled.View<PropsView>`
  border: 1px solid white;
`;
const PostHeader = styled.View<PropsView>`
  margin: 8px 16px 10px 16px;
`;
const PostBody = styled.View<PropsView>`
  max-width: 100%;
  height: auto;
`;
const PostTitle = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.lg};
  color: ${props => props.theme.screen.text};
`;
const PostMedia = styled.Image<PropsImage>`
  max-width: 100%;
  width: auto;
  max-height: 100%;
`;
const PostDescription = styled.Text<PropsText>`
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
};
