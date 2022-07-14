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
  border: 1px solid ${props => props.theme.button.border};
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  margin: 8px 5% 5px 5%;
  padding: 10px 0 10px 10px;
  background-color: ${props => props.theme.screen.background};
`;

const ImageWrapper = styled.View`
  width: 15%;
`;

const UserImage = styled.Image`
  width: 50px;
  height: 50px;
`;

const BodyWrapper = styled.View`
  width: 75%;
  margin: 0 0 8px 24px;
`;

const BodyHeader = styled.View<PropsView>`
  display: flex;
  flex-direction: row;
  align-items: ${props => props.theme.display.alignCenter};
`;

const UserName = styled.Text<PropsText>`
  color: ${props => props.theme.comment.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
`;

const TimeStamp = styled.Text<PropsText>`
  color: ${props => props.theme.comment.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
`;

const BodyComment = styled.View`
  margin: 5px 0;
`;

const Comment = styled.Text<PropsText>`
  font-size: ${props => props.theme.fonts.fontSize.md};
  color: ${props => props.theme.comment.text};
`;

const VotesWrapper = styled.View<PropsView>`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.theme.display.directionRow};
  justify-content: flex-end;
`;

const CommentVoteButton = styled.TouchableOpacity<PropsTouchable>``;

const CommentVote = styled.Text<PropsText>`
  color: ${props => props.theme.screen.text};
  font-size: ${props => props.theme.fonts.fontSize.md};
`;

const BodyFooter = styled.View`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
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
