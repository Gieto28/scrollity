/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {useAppSettings} from '../../context';
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
  userId: string;
  comment: string;
  timeStamp: string;
  upVotes: number;
  downVotes: number;
  commentObj: any;
}

/**
 *
 * @returns comment component being used in the comments screen, it's used in a map to iterate through all the comments of a specific post
 */
const CommentComponent: React.FC<Props> = ({
  name,
  image,
  commentId,
  userId,
  comment,
  timeStamp,
  upVotes,
  downVotes,
}) => {
  const {theme} = useAppSettings();

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
    console.log('deleting Comment - I may or may not implements deletions');
  };

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
