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
  PostHeaderTop,
  PostHeaderTopText,
} from './Styled.PostComponent';
import useDeviceColor from '../../hooks/useDeviceColor';
import {useNavigation} from '@react-navigation/native';
import {HomeStackParams} from '../../navigation/AppStack/HomeScreenStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native';

interface Props {
  title: string;
  timeStamp: string;
  category: string;
  source: any;
  description: string;
  upVotes: number;
  downVotes: number;
  postId: string;
  commentsAmount?: number;
  postObject: {} | undefined;
  comments?: boolean;
}

const PostComponent: React.FC<Props> = ({
  title,
  timeStamp,
  category,
  source,
  description,
  upVotes,
  downVotes,
  postId,
  commentsAmount,
  postObject,
  comments,
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

  const handleUpVote = (postId: string) => {
    console.log('Upvote Button widh id:', postId);
  };
  const handleDownVote = (postId: string) => {
    console.log('DownVote Button with id:', postId);
  };

  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();

  const handleCommentsScreen = (postObject: any) => {
    console.log('Redirect post to comments with object:', postObject);
    console.log({postObject});

    navigation.navigate('CommentsScreen', {
      postObject,
    });
  };

  const checkIfDescriptionExists = () => {
    if (description) {
      return <PostDescription>{description}</PostDescription>;
    }
  };

  const checkIfMediaExists = () => {
    if (source) {
      return (
        <PostMedia
          source={source}
          resizeMode="contain"
          accessibilityLabel={title}
        />
      );
    }
  };

  return (
    <PostFullWidth>
      <PostWrapper>
        <PostHeader>
          <PostHeaderTop>
            <PostHeaderTopText>
              {category} ● {timeStamp}
            </PostHeaderTopText>
          </PostHeaderTop>
          <PostTitle>{title}</PostTitle>
        </PostHeader>
        <PostBody>
          {checkIfMediaExists()}
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
            {comments && (
              <>
                <PostButtonIcon
                  onPress={() => handleCommentsScreen(postObject)}>
                  <PostMessageIcon
                    source={commentsIcon}
                    accessibilityLabel="Comments Icon, redirects to comments screen"
                  />
                </PostButtonIcon>
                <PostValues>{commentsAmount}</PostValues>
              </>
            )}
          </PostValuesWrapper>
        </PostFooter>
      </PostWrapper>
    </PostFullWidth>
  );
};

export default PostComponent;
