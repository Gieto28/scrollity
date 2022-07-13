/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
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
  commentObj: any;
}

/**
 *
 * @returns comment component being used in the comments screen, it's used in a map to iterate through all the comments of a specific post
 */
const CommentComponent: React.FC<Props> = ({commentObj}) => {
  console.log(commentObj);
  const {theme} = useAppSettings();
  const upVoteIcon = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');
  const placeholder = require('../../assets/Images/profile-Placeholder.png');

  const handleDeleteComment = () => {
    console.log('deleting Comment - I may or may not implements deletions');
  };

  const handleUpVoteComment = () => {
    console.log('this comment has been up voted');
  };
  const handleDownVoteComment = () => {
    console.log('this comment has been down voted');
  };
  // {user.image ? { uri: user.image } : }
  // user.image ? {uri: user.image} :
  return (
    <CommentWrapper>
      <ImageWrapper>
        <UserImage source={placeholder} />
      </ImageWrapper>
      <BodyWrapper>
        <BodyHeader>
          <UserName>{'user.name'}</UserName>
          <TimeStamp> ● {'dateCreated'}</TimeStamp>
        </BodyHeader>
        <BodyComment>
          <Comment>{commentObj.comment}</Comment>
        </BodyComment>
        <BodyFooter>
          <VotesWrapper>
            <CommentVote>{'up_votes'}</CommentVote>
            <IconComponent
              image={upVoteIcon}
              altText="number of up votes this comment has"
              onPress={handleUpVoteComment}
            />
            <CommentVote>{'down_votes'}</CommentVote>
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
