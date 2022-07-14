import React, {useEffect, useState} from 'react';
import {Dimensions, Image, ImageSourcePropType} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  PostBody,
  PostDescription,
  PostFullWidth,
  PostMedia,
  PostTitle,
  PostValuesWrapper,
  PostValues,
  PostWrapper,
  PostHeader,
  PostMessageIcon,
  PostButtonIcon,
  PostHeaderTop,
  PostHeaderTopText,
  PostDescriptionWrapper,
  PostMediaWrapper,
  PostFooter,
  PostCommentIconWrapper,
} from './Styled.PostComponent';
import {useAppSettings, useAuth} from '../../context';
import {HomeStackParams, PostModel} from '../../models';
import {PUBLIC_POST_PATH_SERVER, URL} from '../../utils/env';
import {getPostAxios, handleVoteAxios} from '../../services';
import getUserVoteAxios from '../../services/post/getUserVoteAxios';
import {timeAgo} from '../../utils/timeAgo';
import {DownVoteIcon, UpVoteIcon, VoteButton} from '../../styles/GlobalStyle';

interface Props {
  postObject: PostModel;
  IconToCommentsScreen?: boolean;
}

/**
 * @param IconToCommentsScreen boolean which either renders the comments icon to redirects to comments page (true) or if it's false it won't render the comments icon. In HomeScreen it's set to true but in the CommentsScreen it's missing, therefore it's false and doesn't load it
 * @param postObject - whole post object being passed down
 * @returns post component being mapped in the home screen
 */
const PostComponent: React.FC<Props> = ({postObject, IconToCommentsScreen}) => {
  const {
    _id,
    category,
    comments,
    dateCreated,
    description,
    down_votes,
    up_votes,
    media_id,
    title,
  } = postObject;

  // destructuring from context
  const {theme} = useAppSettings();
  const {userId} = useAuth();

  // states
  const [mediaHeight, setMediaHeight] = useState<number>();
  const [waitingVote, setWaitingVote] = useState<boolean>(false);
  const [updatePost, setUpdatePost] = useState<PostModel>();
  const [userVote, setUserVote] = useState<any | null>();

  // set values that won't change
  const deviceWidth = Dimensions.get('window').width;

  const upVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');

  const downVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-dark.png')
    : require('../../assets/Images/arrow-24-downvote-light.png');

  const commentsIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/comments-24-dark.png')
    : require('../../assets/Images/comments-24-light.png');

  const activeUpvote: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-active-dark.png')
    : require('../../assets/Images/arrow-24-upvote-active-light.png');

  const activeDownvote: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-active-dark.png')
    : require('../../assets/Images/arrow-24-downvote-active-light.png');

  useEffect(() => {
    const checkUserLikes = async () => {
      try {
        const user_vote = await getUserVoteAxios(_id, userId);
        setUserVote(user_vote.data);
      } catch (e: any) {
        throw new Error(e.message);
      }
    };
    checkUserLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePost]);

  const handleVote = async (vote: number, post_id: number) => {
    try {
      if (vote === 1) {
        setWaitingVote(true);
      }
      if (vote === 0) {
        setWaitingVote(true);
      }

      await handleVoteAxios(vote, post_id, userId!);
      const post = await getPostAxios(_id);
      setUpdatePost(post);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setWaitingVote(false);
  };

  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();

  const handleCommentsScreen = () => {
    navigation.navigate('CommentsScreen', {
      postObject,
    });
  };

  const getFolderName = () => {
    if (media_id) {
      if (media_id.split('.')[2].toString() === 'image') {
        return 'images';
      } else if (media_id.split('.')[2].toString() === 'video') {
        return 'videos';
      }
    }
  };

  const path: string = `${URL}${PUBLIC_POST_PATH_SERVER}/${getFolderName()}/${media_id}`;

  //calculating height according to device width
  if (media_id) {
    Image.getSize(path, (width, height) => {
      const calc: number = width / deviceWidth;
      setMediaHeight(height / calc);
    });
  }

  const mediaStyling = {
    height: mediaHeight ? mediaHeight : 280,
    width: deviceWidth,
  };

  const dynamicFooter = () => {
    return IconToCommentsScreen ? 'space-between' : 'flex-end';
  };

  return (
    <PostFullWidth>
      <PostWrapper>
        <PostHeader>
          <PostHeaderTop>
            <PostHeaderTopText>
              {category} ● {timeAgo(dateCreated)}
            </PostHeaderTopText>
          </PostHeaderTop>
          <PostTitle>{title}</PostTitle>
        </PostHeader>
        <PostBody>
          {media_id && (
            <PostMediaWrapper style={mediaStyling}>
              <PostMedia
                source={
                  mediaHeight
                    ? {
                        uri: path,
                      }
                    : require('../../assets/Images/loading-media.gif')
                }
                style={mediaStyling}
                resizeMode="stretch"
                accessibilityLabel={title}
              />
            </PostMediaWrapper>
          )}
          {description ? (
            <PostDescriptionWrapper>
              <PostDescription>{description}</PostDescription>
            </PostDescriptionWrapper>
          ) : null}
        </PostBody>
        <PostFooter
          style={{
            justifyContent: dynamicFooter(),
          }}>
          <PostValuesWrapper>
            <PostValues>
              {updatePost ? updatePost.up_votes : up_votes}
            </PostValues>
            <VoteButton
              disabled={waitingVote}
              onPress={() => handleVote(1, _id)}>
              <UpVoteIcon
                source={userVote?.vote === 1 ? activeUpvote : upVoteIcon}
                accessibilityLabel="Up vote Icon"
              />
            </VoteButton>
            <PostValues>
              {updatePost ? updatePost.down_votes : down_votes}
            </PostValues>
            <VoteButton
              disabled={waitingVote}
              onPress={() => handleVote(0, _id)}>
              <DownVoteIcon
                source={userVote?.vote === 0 ? activeDownvote : downVoteIcon}
                accessibilityLabel="Down vote Icon"
              />
            </VoteButton>
          </PostValuesWrapper>
          <PostCommentIconWrapper>
            {IconToCommentsScreen && (
              <>
                <PostButtonIcon onPress={() => handleCommentsScreen()}>
                  <PostMessageIcon
                    source={commentsIcon}
                    accessibilityLabel="Comments Icon, redirects to IconToCommentsScreen screen"
                  />
                </PostButtonIcon>
                <PostValues>{comments.length}</PostValues>
              </>
            )}
          </PostCommentIconWrapper>
        </PostFooter>
      </PostWrapper>
    </PostFullWidth>
  );
};

export default PostComponent;
