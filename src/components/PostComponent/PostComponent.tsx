import React from 'react';
import {
  PostBody,
  PostDescription,
  PostFooter,
  PostFullWidth,
  PostMedia,
  PostTitle,
  PostValuesWrapper,
  PostValues,
  PostWrapper,
  PostHeader,
  PostUpVoteIcon,
  PostDownVoteIcon,
  PostMessageIcon,
  PostButtonIcon,
} from './Styled.PostComponent';
import useDeviceColor from '../../hooks/useDeviceColor';

interface Props {
  name: string;
  source: any;
  description: string;
  upVotes: number;
  downVotes: number;
  postId: string;
  commentsNumber: number;
}

const PostComponent: React.FC<Props> = ({
  name,
  source,
  description,
  upVotes,
  downVotes,
  postId,
  commentsNumber,
}) => {
  const theme = useDeviceColor();

  const upVoteIcon = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');

  const downVoteIcon = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-dark.png')
    : require('../../assets/Images/arrow-24-downvote-light.png');

  const commentsIcon = theme.bool
    ? require('../../assets/Images/comments-24-dark.png')
    : require('../../assets/Images/comments-24-light.png');

  const checkIfDescriptionExists = () => {
    if (description) {
      return <PostDescription>{description}</PostDescription>;
    }
  };

  const handleUpVote = (postId: string) => {
    console.log('Upvote Button widh id:', postId);
  };
  const handleDownVote = (postId: string) => {
    console.log('DownVote Button with id:', postId);
  };
  const handleCommentsScreen = (postId: string) => {
    console.log('Redirect post to comments with id:', postId);
  };

  return (
    <PostFullWidth>
      <PostWrapper>
        <PostHeader>
          <PostTitle>{name}</PostTitle>
        </PostHeader>
        <PostBody>
          <PostMedia
            source={require('../../assets/Images/Logo-NBG.png')}
            resizeMode="contain"
            accessibilityLabel={name}
          />
          {checkIfDescriptionExists()}
        </PostBody>
        <PostFooter>
          <PostValuesWrapper>
            <PostValues>{upVotes}</PostValues>
            <PostButtonIcon onPress={() => handleUpVote(postId)}>
              <PostUpVoteIcon
                source={upVoteIcon}
                accessibilityLabel="Up vote Icon"
              />
            </PostButtonIcon>
            <PostValues>{downVotes}</PostValues>
            <PostButtonIcon onPress={() => handleDownVote(postId)}>
              <PostDownVoteIcon
                source={downVoteIcon}
                accessibilityLabel="Down vote Icon"
              />
            </PostButtonIcon>
          </PostValuesWrapper>
          <PostValuesWrapper>
            <PostButtonIcon onPress={() => handleCommentsScreen(postId)}>
              <PostMessageIcon
                source={commentsIcon}
                accessibilityLabel="Comments Icon, redirects to comments screen"
              />
            </PostButtonIcon>
            <PostValues>{commentsNumber}</PostValues>
          </PostValuesWrapper>
        </PostFooter>
      </PostWrapper>
    </PostFullWidth>
  );
};

export default PostComponent;
