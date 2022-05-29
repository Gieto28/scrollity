import {TextProps, ViewProps} from 'react-native';
import styled from 'styled-components/native';
import {ThemeProps} from '../../styles/theme';

interface PropsText extends TextProps {
  theme: ThemeProps;
}

interface PropsView extends ViewProps {
  theme: ThemeProps;
}

const CommentWrapper = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  max-width: 80%;
  margin-left: 20px;
`;

const ImageWrapper = styled.View``;

const UserImage = styled.Image`
  max-width: 30px;
  max-height: 30px;
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

const BodyComment = styled.View``;

const Comment = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.md};
`;

const VotesWrapper = styled.View<PropsView>`
  display: flex;
  flex-direction: ${props => props.theme.display.directionRow};
`;

const CommentVote = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.md};
  margin-left: 10px;
`;

const BodyFooter = styled.View``;

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
  CommentVote,
  BodyFooter,
};
