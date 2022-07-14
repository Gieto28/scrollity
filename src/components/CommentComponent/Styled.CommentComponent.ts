import {TextProps, TouchableOpacityProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

interface PropsTouchable extends TouchableOpacityProps {
  theme: ThemeProps;
}

const CommentWrapper = styled.View<PropsView>`
  border-color: ${props => props.theme.button.border};
  border-bottom-style: solid;
  border-top-style: solid;
  border-bottom-width: 1px;
  border-top-width: 1px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  max-width: 80%;
  margin-left: 20px;
  padding: 5px 10px;
`;

const ImageWrapper = styled.View``;

const UserImage = styled.Image`
  max-width: 100px;
  max-height: 100px;
`;

const BodyWrapper = styled.View`
  margin-left: 10px;
`;

const BodyHeader = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.theme.display.alignCenter};
`;

const UserName = styled.Text<PropsText>`
  color: ${props => props.theme.comment.text};
  font-size: ${props => props.theme.fonts.fontSize.l};
`;

const TimeStamp = styled.Text<PropsText>`
  color: ${props => props.theme.comment.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
`;

const BodyComment = styled.View`
  margin-top: 4px;
`;

const Comment = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.md};
  color: ${props => props.theme.comment.text};
`;

const VotesWrapper = styled.View<PropsView>`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.theme.display.directionRow};
`;

const CommentVoteButton = styled.TouchableOpacity<PropsTouchable>``;

const CommentVote = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
  margin-left: 16px;
`;

const BodyFooter = styled.View`
  margin-top: 8px;
`;

export {
  CommentWrapper,
  ImageWrapper,
  UserImage,
  BodyWrapper,
  BodyHeader,
  UserName,
  TimeStamp,
  BodyComment,
  Comment,
  VotesWrapper,
  CommentVoteButton,
  CommentVote,
  BodyFooter,
};
