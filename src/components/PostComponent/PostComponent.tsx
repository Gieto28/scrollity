import React, {useState} from 'react';
import {Dimensions, Image, ImageSourcePropType, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
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
  PostDescriptionWrapper,
  PostMediaWrapper,
} from './Styled.PostComponent';
import {useAppSettings, useAuth} from '../../context';
import {HomeStackParams, PostModel} from '../../models';
import {PUBLIC_POST_PATH_SERVER, URL} from '../../utils/env';
import {handleVoteAxios} from '../../services';
import AsyncStorage from '@react-native-community/async-storage';

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
    user: {_id: creator_id},
  } = postObject;
  //
  const {theme} = useAppSettings();
  const {userId} = useAuth();
  const [mediaHeight, setMediaHeight] = useState<number>();
  const [deviceWidth, setDeviceWidth] = useState<number>(
    Dimensions.get('window').width,
  );
  const [waitingUpVote, setWaitingUpVote] = useState<boolean>(false);
  const [waitingDownVote, setWaitingDownVote] = useState<boolean>(false);

  const upVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-upvote-dark.png')
    : require('../../assets/Images/arrow-24-upvote-light.png');

  const downVoteIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/arrow-24-downvote-dark.png')
    : require('../../assets/Images/arrow-24-downvote-light.png');

  const commentsIcon: ImageSourcePropType = theme.bool
    ? require('../../assets/Images/comments-24-dark.png')
    : require('../../assets/Images/comments-24-light.png');

  const handleVote = async (
    vote: number,
    post_id: number,
    user_id: string | null,
  ) => {
    if (user_id === null) return;
    try {
      if (vote === 1) setWaitingUpVote(true);
      if (vote === 0) setWaitingDownVote(true);

      await handleVoteAxios(vote, post_id, user_id!);
    } catch (e: any) {
      throw new Error(e.message);
    }
    if (vote === 1) setWaitingUpVote(false);
    if (vote === 0) setWaitingDownVote(false);
  };

  const navigation = useNavigation<StackNavigationProp<HomeStackParams>>();

  const handleCommentsScreen = (postObject: any) => {
    console.log('Redirect post to CommentsScreen with object:', postObject);

    navigation.navigate('CommentsScreen', {
      postObject,
    });
  };

  const getFolderName = () => {
    if (media_id)
      if (media_id.split('.')[2].toString() === 'image') {
        return 'images';
      } else if (media_id.split('.')[2].toString() === 'video') {
        return 'videos';
      }
  };

  const path: string = `${URL}${PUBLIC_POST_PATH_SERVER}/${getFolderName()}/${media_id}`;

  //calculating height according to device width
  if (media_id)
    Image.getSize(path, (width, height) => {
      const calc: number = width / deviceWidth;
      setMediaHeight(height / calc);
    });

  return (
    <PostFullWidth>
      <PostWrapper>
        <PostHeader>
          <PostHeaderTop>
            <PostHeaderTopText>
              {category} ● {dateCreated}
            </PostHeaderTopText>
          </PostHeaderTop>
          <PostTitle>{title}</PostTitle>
        </PostHeader>
        <PostBody>
          {media_id && (
            <PostMediaWrapper
              style={{
                height: mediaHeight ? mediaHeight : 280,
                width: deviceWidth,
              }}>
              <PostMedia
                source={
                  mediaHeight
                    ? {
                        uri: path,
                      }
                    : require('../../assets/Images/loading-media.gif')
                }
                style={{
                  height: mediaHeight ? mediaHeight : 280,
                  width: deviceWidth,
                }}
                resizeMode="stretch"
                accessibilityLabel={title}
              />
            </PostMediaWrapper>
          )}
          {description ? (
            <PostDescriptionWrapper>
              <PostDescription>{description}</PostDescription>
            </PostDescriptionWrapper>
          ) : (
            <Text></Text>
          )}
        </PostBody>
        <PostFooter>
          <PostValuesWrapper>
            <PostValues>{up_votes}</PostValues>
            <PostButtonIcon
              disabled={waitingUpVote}
              onPress={() => handleVote(1, _id, userId)}>
              <PostUpVoteIcon
                source={upVoteIcon}
                accessibilityLabel="Up vote Icon"
              />
            </PostButtonIcon>
            <PostValues>{down_votes}</PostValues>
            <PostButtonIcon
              disabled={waitingDownVote}
              onPress={() => handleVote(0, _id, userId)}>
              <PostDownVoteIcon
                source={downVoteIcon}
                accessibilityLabel="Down vote Icon"
              />
            </PostButtonIcon>
          </PostValuesWrapper>
          <PostValuesWrapper>
            {IconToCommentsScreen && (
              <>
                <PostButtonIcon
                  onPress={() => handleCommentsScreen(postObject)}>
                  <PostMessageIcon
                    source={commentsIcon}
                    accessibilityLabel="Comments Icon, redirects to IconToCommentsScreen screen"
                  />
                </PostButtonIcon>
                <PostValues>{comments?.length}</PostValues>
              </>
            )}
          </PostValuesWrapper>
        </PostFooter>
      </PostWrapper>
    </PostFullWidth>
  );
};

export default PostComponent;
