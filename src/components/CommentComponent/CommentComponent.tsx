import React from 'react';
import useDeviceColor from '../../hooks/useDeviceColor';
import IconComponent from '../IconComponent/IconComponent';
import {
  BodyComment,
  BodyFooter,
  BodyHeader,
  BodyWrapper,
  Comment,
  CommentVote,
  CommentWrapper,
  ImageWrapper,
  TimeStamp,
  UserImage,
  UserName,
  VotesWrapper,
} from './Styled.CommentComponent';

interface Props {
  name: string;
  image: string | undefined;
  commentId: string;
  commenterId: string;
  comment: string;
  timeStamp: string;
  upVotes: number;
  downVotes: number;
}

const CommentComponent: React.FC<Props> = ({
  name,
  image,
  commentId,
  commenterId,
  comment,
  timeStamp,
  upVotes,
  downVotes,
}) => {
  const theme = useDeviceColor();

  const upVoteIcon = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');

  let imageSource;

  const checkIfImageExists = () => {
    if (!image) {
      return (imageSource = require('../../assets/Images/profile-Placeholder.png'));
    } else {
      return (imageSource = image);
    }
  };

  const handleDeleteComment = () => {
    console.log('deleting Comment');
  };

  console.log(comment);

  const handleUpVoteComment = () => {
    console.log('this comment has been up voted');
  };
  const handleDownVoteComment = () => {
    console.log('this comment has been down voted');
  };

  return (
    <CommentWrapper>
      <ImageWrapper>
        <UserImage source={checkIfImageExists()} />
      </ImageWrapper>
      <BodyWrapper>
        <BodyHeader>
          <UserName>{name}</UserName>
          <TimeStamp> ● {timeStamp}</TimeStamp>
        </BodyHeader>
        <BodyComment>
          <Comment>{comment}</Comment>
        </BodyComment>
        <BodyFooter>
          <VotesWrapper>
            <CommentVote>{upVotes}</CommentVote>
            <IconComponent
              image={upVoteIcon}
              altText="number of up votes this comment has"
              onPress={handleUpVoteComment}
            />
            <CommentVote>{downVotes}</CommentVote>
            <IconComponent
              image={upVoteIcon}
              altText="number of down votes this comment has"
              onPress={handleDownVoteComment}
            />
          </VotesWrapper>
          {/* <IconComponent
            image={undefined}
            altText={'This button is used to delete the comment'}
            onPress={handleDeleteComment}
          /> */}
        </BodyFooter>
      </BodyWrapper>
    </CommentWrapper>
  );
};

export default CommentComponent;
